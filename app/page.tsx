import Header from "@/components/Header";
import MobileBar from "@/components/MobileBar";
import Ticker from "@/components/Ticker";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Maison from "@/components/sections/Maison";
import Boards from "@/components/sections/Boards";
import Reviews from "@/components/sections/Reviews";
import Infos from "@/components/sections/Infos";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Menu />
        <Maison />
        <Boards />
        <Reviews />
        <Infos />
        <Faq />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
