import React from "react";

import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate(); 

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col ">
        {/* MAIN CARD */}
        <div className="flex justify-center py-10 px-4">
          <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
            
            {/* LEFT SIDE (FORM) */}
            <div className="w-full md:w-1/2 p-6 md:p-12">
              <h2 className="text-[#0F6B75] hover:bg-[#0F6B80] text-2xl md:text-3xl font-extrabold mb-6">
         Create a new account 
              </h2>

              <form className="flex flex-col gap-4">
                <label className="text-gray-700 font-bold">Full name</label>
                <input type="text" className="border border-gray-300 rounded-lg px-4 py-3" />

                <label className="text-gray-700 font-bold">Email Address</label>
                <input type="email" className="border border-gray-300 rounded-lg px-4 py-3" />

                <label className="text-gray-700 font-bold">Password</label>
                <input type="password" className="border border-gray-300 rounded-lg px-4 py-3" />

             
                <label className="text-gray-700 font-bold mt-2">I am a...</label>
              <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-4 mt-2">
  <label className="flex items-center gap-2 border border-[#106C79] font-bold rounded-lg px-4 py-2 cursor-pointer w-30 md:w-auto justify-center">
    <input type="radio" name="role" />
    Student
  </label>
  <label className="flex items-center gap-2 border border-[#106C79] font-bold rounded-lg px-4 py-2 cursor-pointer w-30 md:w-auto justify-center">
    <input type="radio" name="role" />
    Teacher
  </label>
</div>


               

                {/* MOBILE + DESKTOP BUTTONS */}
               <div className="mt-4 flex justify-center">
  <button
    className="bg-[#0F6B75] text-white rounded-xl py-3 font-medium shadow-md
               w-[50%] md:w-[80%] flex justify-center items-center"
    onClick={() => navigate("/signup")} // 👈 navigate to signup page
  >
    Create Account
  </button>
</div>
  <div className="flex justify-center items-center lg:flex lg:justify-center lg:items-center">
    <p className="text-sm text-gray-600 mt-4">
      Already have an account?{" "}
      <span
        className="text-[#0F6B75] font-semibold cursor-pointer"
        onClick={() => navigate("/signin")}
      >
        Log in
      </span>
    </p>
  </div>
              </form>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-8">
              <img src="/amico.png" alt="amico" />
            </div>
          </div>
        </div>

        {/* FOOTER */}
         <footer className="bg-[#0F6B75] text-white text-center py-0 mt-auto">
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
     
        <p className="text-white text-sm mt-0">2025 Examlytic. All rights reserved</p>
      </footer>
      </div>
    </>
  );
}
