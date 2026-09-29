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
import { schemaGraph, serializeSchema, webPageSchema } from "@/lib/site";

const homeDescription =
  "Victoria Club Hotel is a boutique hotel on Sea Beach Road, Bali Sahi, Puri, Odisha. Sea-facing rooms, suites and a villa, a multi-cuisine restaurant, free Wi-Fi and on-site parking. Call +91 8684870142 to book.";

const homePageSchema = schemaGraph(
  webPageSchema({
    path: "/",
    name: "Victoria Club Hotel | Beachside Hotel & Rooms in Puri, Odisha",
    description: homeDescription,
  }),
);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(homePageSchema) }}
      />
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



