import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
export default function HomePage() {
  const features = [
    {
      title: "Smart Proctoring",
      description:
        "Advanced AI-powered proctoring system to ensure integrity and prevent cheating.",
      img: "/smart.png",
    },
    {
      title: "Auto-Grading",
      description:
        "Automated grading system for quick and accurate assessment of student performance.",
      img: "/autoo 1.png",
    },
    {
      title: "Personalized Learning",
      description:
        "Personalized learning paths tailored to individuals students needs nd progress.",
      img: "/learning 1.png",
    },
    {
      title: "Reports",
      description:
        "Detail reports and analytics to track student performance and identify areas of improvement.",
      img: "/reeeports 1.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen w-full bg-white flex flex-col">

     
      <div className="hidden md:block w-full px-6 py-10">

        {/* HERO SECTION */}
        <div className="flex justify-center">
          <div className="max-w-5xl w-full bg-[#0F6B75] text-white rounded-xl p-10">
            <h1 className="text-4xl font-bold leading-tight">
              AI-Powered Exams.<br />Smarter Learning.<br />Secure Future.
            </h1>

            <p className="mt-4 max-w-md text-sm">
              Examlytic is an AI-powered online examination system with smart proctoring,
              automated grading, and personalized learning paths.
            </p>

            {/* Buttons restored */}
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-2 bg-white text-[#0F6B75] rounded-md font-semibold">
                Get Started
              </button>

              <button
        className="px-6 py-2 bg-gray-200 text-black rounded-md font-semibold"
        onClick={() => setPage("login")} // ye SigninPage kholega
      >
        Sign In
      </button>
            </div>
          </div>
        </div>

        {/* KEY FEATURES HEADING */}
        <div className="text-center mt-10">
          <h2 className="text-4xl font-bold">Key Features</h2>
          <p className="text-sm mt-2 max-w-md mx-auto">
            Examlytic offers a comprehensive suite of features designed to enhance the examination experience for both educator and learner.
          </p>
        </div>

{/* IMAGE ONLY SLIDER */}
<div className="max-w-4xl mx-auto mt-6 bg-white rounded-xl p-2 flex items-center justify-center">
  <img
    src={features[currentSlide].img}
    className="w-[650px] h-[300px] object-contain"
  />
</div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-3">
          {features.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-gray-800" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* ------------------- MOBILE VIEW ------------------- */}
      <div className="md:hidden w-full px-4 py-6">

        {/* HERO – PROPER BOX AGAIN */}
        <div className="  rounded-xl p-6 text-center">
          <h1 className="text-[29px] font-bold text- leading-snug">
            AI-Powered Exams.<br />Smarter Learning.<br />Secure Future.
          </h1>

          {/* Description added */}
          <div className="flex justify-center items-center">
  <p className="text-xs w-50  mt-3">
           Examlytic is an AI-powered online examination system with smart proctoring, automated grading, and personalized learning paths.
          </p>
          </div>
        

          {/* Only 1 button */}
          <button className="mt-4 w-30 bg-[#106C79] text-[#FFFFFF] py-2 rounded-xl font-semibold">
            Get Started
          </button>
        </div>

        {/* KEY FEATURES TITLE + DESCRIPTION */}
        <h2 className="text-center text-xl font-bold mt-6">Key Features</h2>

        <p className="text-center text-xs mt-1 text-gray-600 px-4">
          Examlytic offers a comprehensive suite of features designed to enhance the examination experience for both educator and learner.
        </p>

        {/* MOBILE 4 SMALL BOXES */}
        <div className="space-y-3 mt-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#106C79] border border-[#0F6B75]  rounded-lg p-4 w-[80%] h-40 mx-auto"
            >
            <div className="ml-2">  <h3 className="text-lg  font-bold text-[#FFFFFF] ">{f.title}</h3>
              <p className="text-sm  text-[#FFFFFF] w-50 mt-2">{f.description}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
     <footer className="bg-[#0F6B75] text-white text-center py-4 mt-auto">
        <div className="lg:flex lg:justify-between lg:mr-10 lg:ml-10 lg:mt-8">
             <div className="flex justify-center gap-10 text-sm font-medium   lg:gap-10 t lg:flex lg:justify-start">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="flex justify-center gap-4 mt-4  lg:gap-10 t lg:flex lg:justify-end lg:mt-0">
          <div className="w-10 h-10 "><img src="/twitter 1.png" alt="" /></div>
          <div className="w-10 h-10 "><img src="/instagram 1.png" alt="" /></div>
          <div className="w-10 h-10 "><img src="/facebook 1.png" alt="" /></div>
        </div>
        </div>
     
        <p className="text-white text-sm mt-3">2025 Examlytic. All rights reserved</p>
      </footer>
    </div>
    </>
  );
}
