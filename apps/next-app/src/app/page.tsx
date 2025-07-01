import FeaturedCollections from "@/components/HomePage/FeaturedCollections";
import Footer from "@/components/HomePage/Footer";
import Header from "@/components/HomePage/Header";
import Hero from "@/components/HomePage/Hero";
import Newsletter from "@/components/HomePage/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
        <Header />
        <Hero />
        <FeaturedCollections />
        <Newsletter />
        <Footer />
    </div>
  );
}
