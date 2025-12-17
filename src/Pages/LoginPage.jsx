import React, { useState } from "react";
import MainNavbar from "../components/MainNavbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  React.useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock Data
      const defaultUsers = [
        {
          email: "teacher@test.com",
          password: "password123",
          role: "Teacher",
          fullName: "Test Teacher",
        },
        {
          email: "student@test.com",
          password: "password123",
          role: "Student",
          fullName: "Test Student",
        },
      ];

      // Combine with localStorage users
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const allUsers = [...defaultUsers, ...storedUsers];

      // Find user
      const user = allUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        console.log("Login successful", user);

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Redirect based on role
        if (user.role === "Teacher") {
          navigate("/teacher-home", { replace: true });
        } else {
          navigate("/student-home", { replace: true });
        }
      } else {
        setErrors((prev) => ({ ...prev, email: "Invalid email or password" }));
      }
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-white flex flex-col">
        {/* MAIN CARD */}
        <div className="flex justify-center py-10 px-4">
          <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
            {/* LEFT SIDE (FORM) */}
            <div className="w-full md:w-1/2 p-6 md:p-12">
              <h2 className="text-[#0F6B75] text-2xl md:text-3xl font-bold mb-6">
                Sign in to your account
              </h2>
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div>
                  <label className="text-gray-700 font-semibold block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/50`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-700 font-semibold block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/50`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />{" "}
                    Remember Me
                  </label>
                  <a href="#" className="text-[#0F6B75] font-semibold">
                    Forgot your password?
                  </a>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  {/* LOGIN BUTTON */}
                  <button
                    type="submit"
                    className="w-full bg-[#0F6B75] hover:bg-[#0F6B80] text-white rounded-lg py-3 font-medium shadow-md transition-all duration-200"
                  >
                    Login
                  </button>

                  {/* DIVIDER */}
                  <div className="flex items-center">
                    <hr className="flex-1 border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">
                      Or continue with
                    </span>
                    <hr className="flex-1 border-gray-300" />
                  </div>

                  {/* GOOGLE BUTTON */}
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 border hover:bg-gray-300 border-gray-300 rounded-lg py-3 font-medium w-full md:w-[80%] mx-auto transition-all duration-200"
                  >
                    <img
                      src="/google 1.png"
                      alt="Google"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                    Google
                  </button>
                </div>
                <div className="flex justify-center items-center lg:flex lg:justify-center lg:items-center">
                  <p className="text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
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
              <div>
                <img src="/amico.png" alt="amico" className="" />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}
