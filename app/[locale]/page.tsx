import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import PorQueElegirnos from "@/components/sections/PorQueElegirnos";
import PortfolioHorizontal from "@/components/sections/PortfolioHorizontal";
import PrensaStrip from "@/components/sections/PrensaStrip";
import CTAFinal from "@/components/sections/CTAFinal";

export default async function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Servicios />
        <PorQueElegirnos />
        <PortfolioHorizontal />
        <PrensaStrip />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
