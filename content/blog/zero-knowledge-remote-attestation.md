---
title: "zRA: Ditching the Trusted Server for Remote Attestation with zkSNARKs"
description: "How we built a fully non-interactive, publicly verifiable remote attestation protocol using zkSNARKs — no pre-shared secrets, no manufacturer servers, no trust required."
date: "2026-07-26"
author: "Zero Savvy Team"
tags: ["zksnarks", "remote-attestation", "circom", "ethereum", "iot", "research"]
---

Remote attestation (RA) is the mechanism that lets you answer a deceptively hard question: *"is that device over there actually running the software it claims to be running?"* It's the backbone of secure boot, IoT fleet management, DRM, supply-chain integrity checks, and access control at basically every large org that cares about the machines talking to its network.

The problem: almost every RA protocol in production today is stuck in 2010s architecture — an interactive handshake between a device and a verifier who happens to hold a pile of confidential secrets (pre-shared keys, reference measurements, expected responses). If you're not that verifier, you can't check anything. If that verifier's server goes down, attestation for your entire fleet grinds to a halt.

We think that's backwards. So we built **zRA** — a non-interactive, transparent remote attestation protocol built on zkSNARKs, published at [NDSS 2024](https://www.ndss-symposium.org/wp-content/uploads/2024-815-paper.pdf). Here's the rundown.

## The problem with "trust me, I checked"

Classic RA looks like this: a verifier sends a device a random challenge, the device computes a response using secret data only the manufacturer knows, and the verifier compares it against what it expects. Simple, and it works — as long as you're one of the small number of parties with privileged access to that confidential data.

That constraint creates real operational pain:

- **Single points of failure.** The verifier's servers need near-100% uptime for the *entire lifetime* of every device. Prior work like SCRAPS assumes attesting 25,000 devices every 5–10 minutes, which works out to ~100 finalized attestations per second just for one deployment — and that number balloons past 10,000/sec once you're at a million devices.
- **No public verifiability.** Nobody outside the trusted circle can independently check whether a device is legit. You either trust the manufacturer's word, or you don't get to check at all.
- **DoS exposure.** Any protocol that depends on a live, queryable server is a protocol with an attack surface.
- **Infrastructure lock-in.** A lot of blockchain-based approaches (LegIoT, SCRAPS) lean on *permissioned* chains like Hyperledger, which reintroduces the "who do you trust" problem one layer up.

Non-interactive approaches like SeED and PROVE tried to fix the interactivity piece, but they trade it for dependence on reliable real-time clocks or secure log storage/brokers — new infrastructure, new failure modes.

## Our approach: prove it, don't ask for it

zRA flips the model. Instead of a verifier who *knows things* and checks a device's response against that knowledge, we replace the verifier's privileged knowledge with a **zkSNARK proof of knowledge** — something anyone can check, with zero prior context about the device.

The core trick: the manufacturer pre-computes, offline, a giant set of future challenge/response pairs for every device, hashes each pair (bound to the device's public key) with Poseidon, and folds all of those commitments into a Merkle tree. Every device gets a unique root in that structure; all device roots get folded again into one final public Merkle tree. That final root is the only thing that needs to be public — and it reveals *nothing* about the actual challenges or responses.

![Setup Phase](zra-setup-phase.png)
<p align="center">
 <em>Figure (1): Setup phase.</em>
</p>

From there, the protocol runs in four phases:

1. **Setup** (offline, once) — manufacturer builds the double-layered Merkle tree described above.
2. **Publish global challenge** — manufacturer periodically drops the next challenge in the sequence onto a public bulletin board (a blockchain, in our implementation). One challenge, used by *every* device — this is what we call a **global challenge**, and it's what keeps the manufacturer's ongoing communication cost flat regardless of fleet size.
3. **Attestation** — the device computes its response, then generates a zkSNARK proving *"I know a response `r` such that `H(pubkey, challenge, r)` is a leaf in this Merkle tree, at some position, with a valid path to the known root"* — without revealing `r` itself. It signs the proof and posts it.
4. **Verification** — literally anyone checks: is the zkSNARK valid? Does the signer's key match the claimed public key? Is the Merkle root one the manufacturer actually published? Is the challenge the current one? Four checks, zero secrets required, zero calls to the manufacturer.

![Protocol](zra-protocol.png)
<p align="center">
 <em>Figure (2): zRA protocol.</em>
</p>


That's it. No handshake. No privileged database lookup. No dependency on the manufacturer being online after setup.

## What you actually get

- **Trustless public verifiability.** Anyone — auditors, customers, other devices — can verify an attestation with nothing but public data.
- **Zero-trust, server-free operation.** After setup, the manufacturer doesn't need to run *any* service. There's no server to keep patched, scaled, or online.
- **Global challenges.** One challenge publication covers the entire fleet, so manufacturer-side communication cost is flat, not linear in device count.
- **Platform independence.** Since there's no interactivity requirement, zRA runs on basically anything that can host a small piece of public data — including minimal chains like Bitcoin, not just smart-contract platforms.
- **Built-in DoS resistance.** No entity handles direct point-to-point messages; everything reads from public, unrestricted data structures.
- **Distributable trust in setup.** The one phase that *could* be a single point of failure — challenge generation — can be run as a `(t, n)`-threshold ceremony across multiple stakeholders instead of one manufacturer, so no single party can freeze the pipeline or leak future challenges alone.

## How it stacks up

We ran the numbers against SCRAPS and PROVE, the two most comparable recent non-interactive/proxy-based schemes, across communication, storage, and compute:

- **Communication:** in a 100k-device scenario, prior brokers/proxy verifiers need to relay on the order of hundreds of billions of messages as attestation counts climb. zRA's manufacturer sends exactly one message per attestation interval — *total*, not per device.
- **Storage:** the only thing zRA needs to persist is the challenge sequence. Even a wild scenario — 1 million devices, attested 1 million times each — comes out to about 3.2MB of challenge data. Compare that to schemes needing gigabytes of per-device attestation logs.
- **Compute:** the tradeoff is on the device side — generating a zkSNARK proof isn't free. In our benchmarks that cost is real but small: **under 4ms** on a standard laptop CPU (Intel i5-12500H), and about **25 seconds** on a Raspberry Pi Zero 2 W — one of the most constrained boards that can run Node.js at all. Proof size stays flat at ~805 bytes and proving keys stay under 10MB even at a Merkle tree height of 40 (i.e., supporting up to 2^40 device/attestation combinations).

## Under the hood

We built the whole thing on **Circom** for the circuits, plus Solidity smart contracts for verification on Ethereum-compatible chains.

The core circuit reuses the audited `MerkleTreeChecker` component from Tornado Cash (a well-trodden, community-vetted piece of circuit logic) to verify Merkle path membership. On top of that we layer an `Attest` circuit: it Poseidon-hashes `(pubkey, challenge, response)` into a leaf, feeds that into the Merkle checker against the known root, and only produces a valid proof if the check passes.

```circom
template Attest(levels) {
    signal input root;
    signal input pubAddr;
    signal input response;
    signal input challenge;
    signal input pathElements[levels];
    signal input pathIndices[levels];
    signal hashValue;

    component hasher = Poseidon(3);
    hasher.inputs[0] <== pubAddr;
    hasher.inputs[1] <== challenge;
    hasher.inputs[2] <== response;
    hashValue <== hasher.out;

    component tree = MerkleTreeChecker(levels);
    tree.leaf <== hashValue;
    tree.root <== root;
    for (var i = 0; i < levels; i++) {
        tree.pathElements[i] <== pathElements[i];
        tree.pathIndices[i] <== pathIndices[i];
    }
}
```

On the verification side, the deployed smart contract is intentionally boring — it checks that the caller's address matches the proof's public key, that the Merkle root is one the manufacturer actually registered, that the challenge is current, and that the Groth16 proof itself checks out. Four `if (...) revert()` guards and you're done. No oracle calls, no off-chain lookups.

We deployed and exercised this end-to-end on Ethereum's Sepolia testnet — `addRoot` and `publishChallenge` transactions from the manufacturer side, and a full `attest` transaction from a simulated device, all publicly inspectable on-chain.

## Where it doesn't help (yet)

We're not going to pretend this is free. Generating a zkSNARK proof is genuinely more compute-intensive than computing a MAC or checking a signature, which is what most legacy RA schemes ask of the device. On a normal CPU that cost is negligible (single-digit milliseconds), but on truly constrained microcontrollers — think 8-bit/16-bit AVR chips or bare-metal ARM Cortex-M parts without a real OS — proof generation isn't practical yet. That's the open problem: efficient zkSNARK/STARK proving on genuinely tiny silicon, ideally backed by dedicated hardware acceleration. We see this as the natural next research direction, not a dealbreaker for the model itself.

## Try it yourself

The full protocol — Circom circuits, manufacturer and prover scripts, Solidity contracts, and testnet transaction references — is open source:

👉 **[github.com/zero-savvy/zk-remote-attestation](https://github.com/zero-savvy/zk-remote-attestation)**

If you're building device fleets, supply-chain attestation, or anything that currently depends on a "call home to check" model, we'd love to hear whether this approach fits your use case.

---

*Full technical details, security analysis, and benchmarks are in our NDSS 2024 paper, "From Interaction to Independence: zkSNARKs for Transparent and Non-Interactive Remote Attestation."*
