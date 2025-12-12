import { useState } from "react";
import MainNavbar from "../components/MainNavbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

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

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock Backend: Save user to localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if email already exists
      if (existingUsers.some(u => u.email === formData.email)) {
        setErrors(prev => ({ ...prev, email: "Email is already registered" }));
        return;
      }

      const newUser = { ...formData, id: Date.now() };
      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

      console.log("Signup successful", newUser);
      alert("Account created successfully! Please log in.");
      navigate("/login", { replace: true });
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
              <h2 className="text-[#0F6B75] hover:bg-[#0F6B80] text-2xl md:text-3xl font-extrabold mb-6">
                Create a new account
              </h2>

              <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <div>
                  <label className="text-gray-700 font-bold block mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-gray-700 font-bold block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-700 font-bold block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-gray-700 font-bold mt-2 block">
                    I am a...
                  </label>
                  <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-4 mt-2">
                    <label
                      className={`flex items-center gap-2 border ${
                        errors.role ? "border-red-500" : "border-[#106C79]"
                      } font-bold rounded-lg px-4 py-2 cursor-pointer w-30 md:w-auto justify-center`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="Student"
                        checked={formData.role === "Student"}
                        onChange={handleChange}
                      />
                      Student
                    </label>
                    <label
                      className={`flex items-center gap-2 border ${
                        errors.role ? "border-red-500" : "border-[#106C79]"
                      } font-bold rounded-lg px-4 py-2 cursor-pointer w-30 md:w-auto justify-center`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="Teacher"
                        checked={formData.role === "Teacher"}
                        onChange={handleChange}
                      />
                      Teacher
                    </label>
                  </div>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                  )}
                </div>

                {/* MOBILE + DESKTOP BUTTONS */}
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#0F6B75] text-white rounded-xl py-3 font-medium shadow-md
               w-[50%] md:w-[80%] flex justify-center items-center hover:bg-[#0F5F6A] transition-colors"
                  >
                    Create Account
                  </button>
                </div>
                <div className="flex justify-center items-center lg:flex lg:justify-center lg:items-center">
                  <p className="text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span
                      className="text-[#0F6B75] font-semibold cursor-pointer"
                      onClick={() => navigate("/login")}
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
        <Footer />
      </div>
    </>
  );
}
