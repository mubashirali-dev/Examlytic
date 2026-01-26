import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";

const StudentSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    gender: "",
    dob: "",
    rollNumber: "",
    degreeProgram: "",
    department: "",
    sectionBatch: "",
    enrollmentStatus: "Active",
    role: "Student",
  });
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
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

    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.rollNumber.trim()) newErrors.rollNumber = "Registration/Roll Number is required";
    if (!formData.degreeProgram.trim()) newErrors.degreeProgram = "Degree Program is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.sectionBatch.trim()) newErrors.sectionBatch = "Section/Batch is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock Backend: Save user to localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      if (existingUsers.some((u) => u.email === formData.email)) {
        setErrors((prev) => ({ ...prev, email: "Email is already registered" }));
        return;
      }

      // Create user object (excluding confirmPassword and handling file object for mock)
      const { confirmPassword, profilePicture, ...userData } = formData;
      const newUser = { 
          ...userData, 
          id: Date.now(),
          profilePictureName: profilePicture ? profilePicture.name : null // Store name only for mock
      };

      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

      console.log("Student Signup successful", newUser);
      alert("Student account created successfully! Please log in.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-white flex flex-col">
        {/* MAIN CARD */}
        <div className="flex justify-center py-6 md:py-10 px-4">
          <div className="w-full max-w-6xl bg-white rounded-2xl md:rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
            {/* LEFT SIDE (FORM) */}
            <div className="w-full md:w-1/2 p-5 md:p-12">
              <h2 className="text-[#0F6B75] text-2xl md:text-3xl font-extrabold mb-2">
                Create a new account
              </h2>
              <p className="text-gray-500 mb-6">Join us to start your journey</p>

              {/* Role Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                <button 
                  className="flex-1 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer bg-white text-[#0F6B75] shadow-sm"
                >
                  Student
                </button>
                <button 
                  onClick={() => navigate("/signup-teacher")}
                  className="flex-1 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  Teacher
                </button>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                {/* Standard Fields */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-2">Account Details</h3>
                <div>
                    <label className="text-gray-700 font-bold block mb-1">Full Name *</label>
                    <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full border ${errors.fullName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                    <label className="text-gray-700 font-bold block mb-1">Email Address *</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 font-bold block mb-1">Password *</label>
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold block mb-1">Confirm Password *</label>
                        <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                </div>

                {/* Personal Details (Optional) */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-2 mt-4">Personal Details (Optional)</h3>
                <div>
                    <label className="text-gray-700 font-bold block mb-1">Profile Picture</label>
                    <input
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 font-bold block mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none bg-white"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold block mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none"
                        />
                    </div>
                </div>

                {/* Academic Details */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-2 mt-4">Academic Details</h3>
                <div>
                    <label className="text-gray-700 font-bold block mb-1">Registration / Roll Number *</label>
                    <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className={`w-full border ${errors.rollNumber ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none`}
                    />
                    {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 font-bold block mb-1">Degree Program *</label>
                        <input
                        type="text"
                        name="degreeProgram"
                        value={formData.degreeProgram}
                        onChange={handleChange}
                        placeholder="e.g. BSCS, BBA"
                        className={`w-full border ${errors.degreeProgram ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none`}
                        />
                        {errors.degreeProgram && <p className="text-red-500 text-sm mt-1">{errors.degreeProgram}</p>}
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold block mb-1">Department *</label>
                        <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="e.g. Computer Science"
                        className={`w-full border ${errors.department ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none`}
                        />
                        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 font-bold block mb-1">Section / Batch *</label>
                        <input
                        type="text"
                        name="sectionBatch"
                        value={formData.sectionBatch}
                        onChange={handleChange}
                        placeholder="e.g. Fall 2023 - A"
                        className={`w-full border ${errors.sectionBatch ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none`}
                        />
                        {errors.sectionBatch && <p className="text-red-500 text-sm mt-1">{errors.sectionBatch}</p>}
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold block mb-1">Enrollment Status</label>
                        <select
                            name="enrollmentStatus"
                            value={formData.enrollmentStatus}
                            onChange={handleChange}
                            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#0F6B75]/50 rounded-lg px-4 py-3 outline-none bg-white"
                        >
                            <option value="Active">Active</option>
                            <option value="Graduated">Graduated</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#0F6B75] text-white rounded-xl py-3 font-medium shadow-md w-full mt-6 hover:bg-[#0F5F6A] transition-colors cursor-pointer"
                >
                    Create Student Account
                </button>
              </form>

              <div className="flex justify-center items-center lg:flex lg:justify-center lg:items-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <span
                    className="text-[#0F6B75] font-semibold cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="hidden md:flex w-1/2 bg-[#f0f9fa] items-center justify-center p-8">
              <img src="/amico.png" alt="amico" className="max-w-full h-auto" />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default StudentSignUp;
