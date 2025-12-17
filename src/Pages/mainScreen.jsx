import MainNavbar from "../components/MainNavbar.jsx";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import KeyFeatures from "../components/KeyFeatures";

export default function MainScreen() {
  return (
    <>
      <MainNavbar />
      <div className="min-h-screen w-full bg-white flex flex-col">
        <HeroSection />
        <KeyFeatures />
        <Footer />
      </div>
    </>
  );
}
