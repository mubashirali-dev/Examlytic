import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import KeyFeatures from "../components/KeyFeatures";

export default function MainScreen() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-white flex flex-col">
        <HeroSection />
        <KeyFeatures />
        <Footer />
      </div>
    </>
  );
}
