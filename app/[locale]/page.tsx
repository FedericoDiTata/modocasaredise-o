import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import PorQueElegirnos from "@/components/sections/PorQueElegirnos";
import PortfolioHorizontal from "@/components/sections/PortfolioHorizontal";
import Proceso from "@/components/sections/Proceso";
import Testimonios from "@/components/sections/Testimonios";
import CTAFinal from "@/components/sections/CTAFinal";

export default async function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Servicios />
        <PorQueElegirnos />
        <PortfolioHorizontal />
        <Proceso />
        <Testimonios />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
