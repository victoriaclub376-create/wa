import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Featured from "@/components/Featured";
import Rooms from "@/components/Rooms";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CallButton from "@/components/call/CallButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Featured />
        <Rooms />
        <Amenities />
        <Gallery />
        <Testimonials />
        <Location />
        <Newsletter />       
      </main>
      <Footer />
      <WhatsAppButton />
      <CallButton />
    </>
  );
}



