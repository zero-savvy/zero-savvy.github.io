import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Vision } from "@/components/vision";
import { Mission } from "@/components/mission";
import { Problem } from "@/components/problem";
import { Approach } from "@/components/approach";
import { Technical } from "@/components/technical";
import { Research } from "@/components/research";
import { Direction } from "@/components/direction";
import { Team } from "@/components/team";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Vision />
      <Mission />
      <Problem />
      <Approach />
      <Technical />
      <Research />
      <Direction />
      <Team />
      <Footer />
    </main>
  );
}
