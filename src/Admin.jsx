import { useState } from "react";
import axios from "axios";
import { UserPlus, X } from "lucide-react";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ---------------- Email Validation ----------------
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ---------------- Submit Handler ----------------
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/admin/invite-teacher",
        { email }
      );

      setSuccess(response.data?.message || "Invitation sent successfully");
      setEmail("");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send invitation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* ================= Navbar ================= */}
      <div className="h-17 bg-[#0F6B75] text-white flex items-center justify-center gap-2 px-4">
        <img
          src="/logo.png"
          alt="Examlytic Logo"
          className="h-20 w-20 sm:h-8 sm:w-8 lg:h-32 lg:w-15 object-contain"
        />
        <h1 className="text-lg sm:text-xl font-bold lg:text-3xl">
          Examlytic
        </h1>
      </div>

      <div className="flex flex-1">
        {/* ================= Sidebar ================= */}
        <div
          className="w-14 sm:w-16 bg-[#0F6B75] flex justify-center items-start pt-6 cursor-pointer"
        >
          <UserPlus className="text-white" size={20} />
        </div>

        {/* ================= Main ================= */}
        <div className="flex-1 p-3 sm:p-6 bg-gray-100">
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 relative h-full">
            <button
              onClick={() => setOpen(true)}
              className="
                bg-teal-700 text-white
                px-4 py-2 rounded-lg
                hover:bg-teal-600 transition
                absolute bottom-6 left-1/2 -translate-x-1/2
                sm:top-6 sm:right-6 sm:left-auto sm:bottom-auto sm:translate-x-0
              "
            >
              Add Staff
            </button>
          </div>
        </div>
      </div>

      {/* ================= Modal ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-5 sm:p-6 rounded-xl w-full max-w-sm relative">

            {/* Close */}
            <button
              onClick={() => {
                setOpen(false);
                setError("");
                setSuccess("");
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-2">
              Add Staff
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Enter the email address to invite a staff member
            </p>

            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="
                w-full border p-2 sm:p-3 rounded mb-2
                focus:outline-none focus:ring-2 focus:ring-teal-600
              "
            />

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 mb-2">
                {error}
              </p>
            )}

            {/* Success Message */}
            {success && (
              <p className="text-sm text-green-600 mb-2">
                {success}
              </p>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                w-full bg-teal-700 text-white
                py-2 sm:py-2.5 rounded
                hover:bg-teal-600
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
