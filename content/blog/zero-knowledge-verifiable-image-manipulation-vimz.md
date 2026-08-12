---
title: "VIMz: Proving an Image Was Edited Honestly — Without a Trusted Editor"
description: "How folding-based zkSNARKs let us prove image edits are authentic on 8K photos, using under 10GB of RAM and 10KB proofs — no trusted software, no exposed originals."
date: "2026-08-10"
author: "Zero Savvy Team"
tags: ["zksnarks", "nova", "folding-schemes", "c2pa", "image-provenance", "circom", "research"]
---

In 2023, the winner of the Sony World Photography Award turned down the prize after admitting the "photo" was AI-generated. That's the world we're operating in now: consumer-grade tools can face-swap a video convincingly, and a Midjourney subscription costs less than a coffee habit. Figuring out what's real is no longer a niche problem — it's a daily one.

The industry's leading answer right now is [C2PA](https://c2pa.org/) (Coalition for Content Provenance and Authenticity) — the standard behind "Content Credentials." It works by having a trusted camera or app sign an image at capture, then appending signed metadata every time a "trusted" editor (think Photoshop) modifies it. The problem: that trust has to live *somewhere*. Either you trust the editing software not to lie, or you wrap it in a TEE like Intel SGX — which comes with its own well-documented attack history (Plundervolt, LVI, and friends).

There's a cleaner cryptographic answer: zkSNARKs. Instead of trusting software, you get a *proof* that a specific set of edits was applied to a validly signed original — publicly checkable, revealing nothing about the source image or the editor's identity. The catch, as prior work has shown, is brutal resource cost: one existing approach needs **over 300GB of RAM** and **21+ minutes** just to prove a single convolution-based edit on an HD image. That's not a laptop workflow — that's a server farm.

We built [**VIMz**](https://github.com/zero-savvy/vimz) to fix that, published at [PETS 2025](https://petsymposium.org/popets/2025/popets-2025-0065.pdf). Short version: same cryptographic guarantees, ~30x less memory, run entirely on a midrange laptop, and it scales to 8K.

## Why this is hard (and why C2PA cuts corners)

If you want a truly trustless proof that "image β is a valid edit of signed original α," the proof needs to bind *both* images cryptographically — not just verify the transformation math, but also commit to the hash of the original and the hash of the result. That's what we call a **complete proof**.

Prior zkSNARK-based attempts (like ZK-IMG) do this, but the entire image — potentially tens of megabytes of pixel data — gets fed into the proving system as one giant witness in a single pass. Proving systems that operate this way scale memory usage with image size in a way that gets ugly fast: HD already means 300+ GB of RAM. 4K or 8K would be simply untouchable.

C2PA sidesteps this cost entirely by not using ZK proofs at all — it just signs metadata and trusts the software. That's cheap, but it means the *editor's* identity is exposed, the *editing environment* has to be trusted, and there's no cryptographic proof that the claimed edit actually matches the pixels.

## Our approach: fold the image, don't swallow it whole

The insight behind VIMz is simple to state: most real-world image edits — grayscale, contrast, brightness, blur, sharpen, resize, crop — only need to look at a pixel and maybe its close neighbors. They don't need global context. That means you can process an image **row by row**, proving each row's transformation independently, and then *fold* all those row-level proofs together into one compact proof using a technique called **Incrementally Verifiable Computation (IVC)** — specifically, [Nova](https://github.com/microsoft/Nova)'s folding scheme.

![Protocol](nova.png)
<p align="center">
 <em>Figure (1): The folding scheme structure in Nova.</em>
</p>

Instead of one massive circuit holding the whole image in memory, you get a small circuit that runs once per row, folding its result into a running accumulator. Peak memory becomes proportional to *one row plus overhead*, not the whole image. That's the whole trick, and it's why VIMz's memory footprint barely moves as resolution climbs from HD to 8K.

![Protocol](row-by-row.png)
<p align="center">
 <em>Figure (2): Row-by-row traversal in VIMz.</em>
</p>


Each fold step does two things simultaneously:
1. Verifies the transformation was applied correctly to that row (e.g., the grayscale formula, or a blur convolution kernel).
2. Extends a running Poseidon hash of both the original row and the transformed row, so the final proof cryptographically commits to the hash of the *entire* original and the *entire* result — without ever needing the whole image in memory at once.

That second part is what makes these "complete proofs" — they prove the edit *and* bind it to specific before/after images, all without revealing anything except the final output.

## What you get

- **Chained, private edits.** Since each transformation folds into the next, you can chain grayscale → crop → contrast → sharpen and only the *final* image is ever revealed. Every intermediate version stays confidential — useful if an editor doesn't want to expose their whole workflow.
- **Anonymous signer and editor.** VIMz proves the original was signed by *a* valid, registered key — via a Merkle-tree membership proof — without revealing *which* key. Combined with the editor never needing to sign anything, both the photographer's and the editor's identities can stay private while authenticity still checks out.
- **Small proofs, fast verification.** Proof size holds at roughly 10–11KB regardless of resolution — small enough to post on-chain — and verification takes well under a second.
- **Practical hardware requirements.** Peak memory came in at about 2.9GB for HD, 5.6GB for 4K, and 9.5GB for 8K (33 megapixels, ~100MB source file) — all comfortably inside a 16GB laptop.
- **Parallelizable.** Because each transformation's memory footprint is so low, you can run several VIMz instances at once on the same machine to prove a chain of edits in parallel, picking up an extra 3.5x average speedup.

## How it stacks up

Against ZK-IMG, the most directly comparable "complete proof" system: VIMz proves an HD sharpness transformation **~3x faster**, using **roughly 100x less memory** (2.8GB vs. 305GB).

Against two more recent, concurrent systems that also target lower prover complexity: on 33-megapixel images, VIMz comes out **13–25% faster** to prove, with proof sizes **more than 90% smaller**, and — critically — those competing systems don't hash the transformed image into the proof at all. That means their proof has to ship the *entire transformed image* as a public input just to verify it, which routinely exceeds 8MB — nowhere close to fitting in a typical Ethereum block. VIMz's proof is self-contained at ~10KB, chainable, and blockchain-friendly by design.

We also worked out a folding-friendly, lossless pixel-compression trick: packing multiple RGB pixel values into a single field element before hashing (the Pallas/Vesta field gives you 254 usable bits — plenty of room for ten 8-bit pixel values). That alone cuts the number of hash operations by roughly 30x.

## The core building block: IVC over a folding scheme

Nova's IVC lets you prove a repeated computation `z_i = F(z_{i-1}, ω_{i-1})` for `i = 1...n`, where `F` is a fixed step function, `z` is the "public" running state carried between steps, and `ω` is a fresh private input at each step. Critically, the *proof size and verifier cost stay constant* regardless of `n` — you can run a million steps and still verify in the same time as one.

VIMz maps image transformation onto this directly. For an image with `n` rows, `F` = "process one row." The public state `z_i` carries forward the two running hashes:

```
z_i = (h_α^i, h_β^i)
```

and the private witness `ω_i` at each step is the actual pixel data for row `i` of both the original (`α_i`) and transformed (`β_i`) image. The step function does two jobs at once: apply and check the transformation on that row, and extend both hash chains. This dual-purpose step is the "folding-friendly verifiable image transformer" we formalize in the paper (`𝓕_T`).

![Protocol](vimz-fold.png)
<p align="center">
 <em>Figure (3): Folding steps of VIMz.</em>
</p>


## Fixed-point math in a prime field

Circom/R1CS circuits work over a prime field `𝔽_q`, which has no native concept of floating point or negative numbers. This bites you constantly in image processing since almost every filter formula involves decimals (0.299, 0.587, 0.114 for grayscale weights) or values that can go negative (contrast/brightness overflow).

The trick we use everywhere is scale-and-tolerance:

```
val = (α^R * 299) + (α^G * 587) + (α^B * 114)   // scaled by 1000
assert |val - β_{i,j} * 1000| < 1000
```

Rather than requiring exact equality (which floating-point rounding makes impossible to guarantee across implementations), we assert the computed value lands within one unit of the claimed output at the chosen precision. Contrast and brightness use a 100x scale (0.01 precision); resize's bilinear interpolation uses a 6x scale since the weights come out in sixths.

**Handling negative values (`cap`)** is the more interesting piece. In a prime field there's no sign bit — `-x` is represented as `q - x`. To implement `cap(0, 255)` for an out-of-range pixel value, the circuit has to:
1. Compare `x` against `q - x`. If `x < q - x`, treat it as non-negative; otherwise it's "negative" and gets floored to 0.
2. If non-negative, compare against 255 and clamp on the high end too.

This is done with a `LessThan` comparator circuit feeding into a `Mux1` selector — two conditional branches manually built out of comparison gates and multiplexers, since R1CS has no native `if/else`.

## Why crop and resize are the annoying ones

Most transformations are trivially "apply the same function to every row." Crop and resize break that symmetry:

**Crop** needs the circuit to know, at each step, whether the current row falls inside the crop window — that's a runtime condition, but R1CS constraints must be fixed at *compile time*. You can't write a normal `if (y <= row_index < y + height_crop)` and have it "just work," because doing so requires *non-quadratic constraints*, which R1CS forbids. Our workaround: build both branches of the conditional (update the hash / don't update the hash) unconditionally, then use a boolean selector — the product of a `GreaterEqThan` and `LessThan` gate output — to multiplex between them:

```
selector.c[0] = prev_crop_hash        // branch: not in crop area
selector.c[1] = trans_hasher.hash     // branch: in crop area
selector.s = (row_index >= crop_y) * (row_index < crop_y + crop_height)
```

![Protocol](crop.png)
<p align="center">
 <em>Figure (4): Realising crop in row-by-row traverse.</em>
</p>

There's a second, harder problem hiding in "which *columns*." Selecting an arbitrary horizontal subset of a row at *runtime* requires a multiplexer of width `crop_width`, each handling `|row_width - crop_width|` possible input positions — expensive. We support two modes: a **prover-optimized** crop where `x, y` are baked into the circuit at compile time (cheap, but needs a fresh verification key per crop location — fine for local editing, awkward for on-chain verifiers), and a **verifier-optimized "selective crop"** with real multiplexers so `x, y` become normal runtime public inputs. Selective crop is significantly more expensive (roughly 5x the proving time of fixed crop at HD, per our benchmarks) — that's the direct cost of runtime flexibility in R1CS.

**Resize** breaks row-parallelism differently: the *ratio* of input rows to output rows isn't 1:1. Downscaling HD (720 rows) to SD (480 rows) is a 3:2 ratio, so each fold step actually has to consume 3 original rows to produce 2 resized rows, running bilinear interpolation across up to 4 neighboring source pixels per output pixel. Since resolutions are fixed ahead of time for a given deployment, the interpolation weights become circuit constants rather than runtime values — this keeps the constraint count low (the resize circuit at Merkle height 20 sits around the same constraint count as grayscale, ~5K gates).

**Convolution** (blur, sharpen) has a related but distinct wrinkle: a kernel of size `(2k+1)×(2k+1)` needs `k` rows above and below the current one. Since folding steps only see one "current" state, we pass the hashes of the `2k` boundary rows explicitly between steps and assert consistency — each step checks that the row hashes it received match rows it previously computed, then passes forward the *new* trailing rows' hashes for the next step to verify against. This is what let us implement blur/sharpen correctly across a folding boundary without needing global image access — something a competing tile-based approach (which we compare against) explicitly can't do without seams/errors at tile boundaries.

## Anonymizing the signer without weakening the proof

To let anyone prove "this image was signed by *some* valid registered key" without revealing *which* one, we build a Merkle tree of `n` authorized public keys (each hidden behind a random nonce), and require a zkSNARK proving:

```
∃ sig_α, MP_i, r_i, pk_i :
    Verify(h_α, sig_α, pk_i) = 1  AND
    MerkleOpen(pk_i, r_i, 𝒯, MP_i) = 1
```

We actually didn't need to build the ECDSA-in-circuit machinery from scratch — this maps directly onto existing "prove group membership of an ECDSA signer" tooling (spartan-ecdsa), which reports ~4 seconds to prove membership in a group of up to 2^20 (~1 million) keys, ~300ms to verify, ~2KB proof. That gets composed alongside the transformation proof.

## The compression trick, concretely

Since Pallas/Vesta field elements hold 254 usable bits and an RGB byte is 8 bits, we pack up to 10 full pixels (30 bytes = 240 bits) into a single field element before hashing:

```circom
component toBits = Num2Bits(240);
// pack 10 pixels × 3 channels into `in`
```

![Protocol](compression.png)
<p align="center">
 <em>Figure (5): Lossless compression technique in VIMz.</em>
</p>

This is why hashing drops by ~30x — instead of hashing every individual byte, Poseidon operates over pre-packed field elements. The cost is that you need a **decompression** circuit downstream (splitting the packed field element back into individual 8-bit channel values via `Bits2Num`) any time you need to actually operate on individual pixel values rather than just their hash.

## Soundness, in one paragraph

The security argument reduces to two things holding: Poseidon's collision resistance, and Nova/Spartan's knowledge soundness. If a cheating prover could get a proof accepted for a wrong final image `β' ≠ β` where `H_φ(β') = h_β^n`, they'd have found a hash collision — negligible probability. If they instead try to sneak in a valid-looking proof with the wrong public inputs entirely (wrong `z_0` or `z_n`), that's broken by Nova's own IVC soundness guarantee. There's no separate "trust the transformation logic" assumption — it's fully reduced to primitives we already assume are hard to break.

## Where folding doesn't help (yet)

The row-by-row folding trick works great for what we call "folding-friendly" transformations — anything where a pixel's fate depends only on itself or its close neighbors. Grayscale, contrast, brightness, crop, resize, blur, sharpen — all folding-friendly.

Rotation, affine transforms, and shear are a different story. These relocate pixels across the entire image (a pixel from row 10 might end up in row 400 of the output), which breaks the "process one row, move to the next" assumption that folding depends on. Right now those transformations sit outside VIMz's scope — an open problem for future folding-scheme research, alongside newer folding constructions like HyperNova.

## The stack

VIMz is built on:
- **Circom** for defining per-step circuits
- **Nova** (via the [Nova-Scotia](https://github.com/nalinbhardwaj/Nova-Scotia) frontend) for the folding/IVC engine
- **Spartan** to compress the final IVC proof into a succinct SNARK
- **Python** for the transformation interface that prepares circuit inputs


![Protocol](arch.png)
<p align="center">
 <em>Figure (6): The architecture of VIMz.</em>
</p>

It's fully [open source](https://github.com/zero-savvy/vimz), with sample images at SD/HD/4K resolutions and pre-built transformation configs so you can reproduce our benchmarks without touching a single line of circuit code.




## Try it yourself

The complete implementation — Circom circuits, the Rust/Nova prover, Python GUI, and example smart contracts for a C2PA-compatible marketplace — is available on [GitHub](https://github.com/zero-savvy/vimz). If you're working on media provenance, content authenticity, or just want to see folding schemes doing something other than a toy example, we'd love feedback.


![Protocol](gui.png)
<p align="center">
 <em>Figure (7): VIMz GUI via Python.</em>
</p>


![Protocol](output.png)
<p align="center">
 <em>Figure (8): Example output of VIMz.</em>
</p>

---

*Full protocol definitions, security proofs, circuit-level details, and the complete experimental breakdown are in our [PETS 2025 paper, "VIMz: Private Proofs of Image Manipulation using Folding-based zkSNARKs."](https://petsymposium.org/popets/2025/popets-2025-0065.pdf)*
