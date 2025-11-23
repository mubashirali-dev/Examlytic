import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  
  const [open, setOpen] = React.useState(false);
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
            <h2 className="text-[#0F6B75] text-2xl md:text-3xl font-bold mb-6">
              Sign in to your account
            </h2>
            <form className="flex flex-col gap-4">
              <label className="text-gray-700 font-semibold">Email Address</label>
              <input type="email" className="border border-gray-300 rounded-lg px-4 py-3" />
              <label className="text-gray-700 font-semibold">Password</label>
              <input type="password" className="border border-gray-300 rounded-lg px-4 py-3" />
              <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#" className="text-[#0F6B75] font-semibold">
                  Forgot your password?
                </a>
              </div>

            
              <div className="mt-4">
                {/* MOBILE: Divider uper */}
                <div className="md:hidden flex items-center mb-4">
                  <hr className="flex-1 border-gray-300" />
                  <span className="mx-2 text-gray-400 text-sm">Or continue with</span>
                  <hr className="flex-1 border-gray-300" />
                </div>

                {/* MOBILE BUTTONS (smaller + centered) */}
                <div className="md:hidden flex flex-col gap-3 items-center">
                  <button 
                      className="bg-[#0F6B75] text-white rounded-lg py-3 font-medium shadow-md w-[85%]"
                      onClick={() => navigate("/")}
                    >
                      Login
                    </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 border hover:bg-gray-300 border-gray-300 rounded-lg py-3 font-medium w-[85%]"
                  >
                    <img
                      src="/google 1.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Google
                  </button>
                </div>

                {/* DESKTOP VIEW */}
                <div className="hidden md:block">
                 <button
                      className="w-full bg-[#0F6B75] hover:bg-[#0F6B80] text-white rounded-lg py-3 font-medium shadow-md"
                      onClick={() => navigate("/")} 
                    >
                      Login
                    </button>
                  <div className="flex items-center my-4">
                    <hr className="flex-1 border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">Or continue with</span>
                    <hr className="flex-1 border-gray-300" />
                  </div>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 border hover:bg-gray-300 border-gray-300 rounded-lg py-3 font-medium w-[80%] mx-auto"
                  >
                    <img
                      src="/google 1.png"
                      alt="Google"
                      className="w-6 h-6"
                    />
                    Google
                  </button>
                </div>
              </div>
             <div className="flex justify-center items-center lg:flex lg:justify-center lg:items-center">
                         <p className="text-sm text-gray-600 mt-4">
  Don,t have an account?{" "}
  <span
    className="text-[#0F6B75] font-semibold cursor-pointer"
    onClick={() => navigate("/signup")}
  >
    Signup here
  </span>
</p>
             </div>
    
            </form>
          </div>

          {/* RIGHT SIDE ILLUSTRATION (Desktop only) */}
          <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-8">
            <div >
             <img
                      src="/amico.png"
                      alt="amico"
                      className=""
                    />
            </div>
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
