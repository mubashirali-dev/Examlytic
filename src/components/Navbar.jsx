import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onSignInPage = location.pathname === "/signin";
  const onSignUpPage = location.pathname === "/signup";

  return (
    <nav className="w-full bg-[#0F6B75] py-4 px-6 flex items-center justify-between relative">

      {/* LEFT LOGO */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Examlytic Logo" className="w-12 h-10" />
        <h1 className="text-white text-xl font-bold">Examlytic</h1>
      </div>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex items-center gap-8  text-white font-medium">
        <a href="#" className="hover:text-gray-300">Features</a>
        <a href="#" className="hover:text-gray-300">Resources</a>
        <a href="#" className="hover:text-gray-300">Support</a>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">

        {/* DESKTOP LOGIN BUTTON */}
        {!onSignInPage && (
          <button
            className="hidden md:block bg-white text-[#0F6B75] hover:bg-gray-300 font-semibold px-6 py-2 rounded-lg"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        )}

        {/* DESKTOP SIGNUP BUTTON */}
        {!onSignUpPage && (
          <button
            className="hidden md:block bg-white text-[#0F6B75] hover:bg-gray-300 font-semibold px-6 py-2 rounded-lg"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}

        {/* MOBILE LOGIN BUTTON */}
        {!onSignInPage && (
          <button
            className="md:hidden bg-white text-[#0F6B75] hover:bg-gray-300 font-semibold px-4 py-2 rounded-lg"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        )}

        {/* MOBILE SIGNUP BUTTON */}
        {!onSignUpPage && (
          <button
            className="md:hidden bg-white text-[#0F6B75] hover:bg-gray-300 font-semibold px-4 py-2 rounded-lg"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}

        {/* MOBILE MENU ICON */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#0F6B75] text-white flex flex-col px-6 py-4 gap-4 md:hidden shadow-lg animate-slideDown">

          {/* Links */}
          <a href="#" className="text-lg">Features</a>
          <a href="#" className="text-lg">Resources</a>
          <a href="#" className="text-lg">Support</a>


          {/* OPTIONAL: Sign Up inside dropdown if you want extra */}
          {/* Ham yaha dropdown me nahi rakhenge kyunki mobile me already left side pe show hai */}
        </div>
      )}
    </nav>
  );
}
