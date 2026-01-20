import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar.jsx";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import KeyFeatures from "../components/KeyFeatures";

export default function MainScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      if (currentUser.role === "Teacher") {
        navigate("/teacher-home", { replace: true });
      } else {
        navigate("/student-home", { replace: true });
      }
    }
  }, [navigate]);
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
