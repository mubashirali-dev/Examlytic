

import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu toggle state

  return (
    <nav className="w-full bg-[#0F6B75] py-4 px-6 flex items-center justify-between relative">

      {/* LEFT SIDE LOGO */}
      <div className="flex items-center gap-2">
        <div>
          <img
            src="/logo.png"  // apni logo file path yaha lagao
            alt="Examlytic Logo"
            className="w-12 h-10"
          />
        </div>
        <h1 className="text-white text-xl font-bold">Examlytic</h1>
      </div>

      {/* DESKTOP MENU LINKS */}
      <div className="hidden md:flex items-center gap-8 text-white font-medium">
        <a href="#">Features</a>
        <a href="#">Resources</a>
        <a href="#">Support</a>
      </div>

      {/* SIGN UP + MENU (Right Side) */}
      <div className="flex items-center gap-4">

        {/* DESKTOP Sign Up */}
        <button className="hidden md:block bg-white text-[#0F6B75] font-semibold px-6 py-2 rounded-lg">
          Sign Up
        </button>

        {/* MOBILE Sign Up */}
        <button className="md:hidden bg-white text-[#0F6B75] font-semibold px-4 py-2 rounded-lg">
          Sign Up
        </button>

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
          <a href="#" className="text-lg">Features</a>
          <a href="#" className="text-lg">Resources</a>
          <a href="#" className="text-lg">Support</a>

          
        </div>
      )}
    </nav>
  );
}
