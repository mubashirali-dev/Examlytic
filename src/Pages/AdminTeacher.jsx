import { useState, useEffect } from "react";
import axios from "axios";
import { X, Search } from "lucide-react";

const AdminTeacher = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [fetchingTeachers, setFetchingTeachers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = teachers.filter(t => 
    [t.name, t.qualification, t.userId?.email, t.phone]
      .some(val => val?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // ---------------- Email Validation ----------------
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ---------------- Fetch Teachers ----------------
  const fetchTeachers = async () => {
    setFetchingTeachers(true);
    try {
      const response = await axios.get("http://localhost:5000/api/teacher");
      setTeachers(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
    } finally {
      setFetchingTeachers(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

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

      // Refresh teacher list after successful invite
      fetchTeachers();
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
    <div className="max-w-6xl mx-auto pb-10">
      
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-[1.75rem] font-bold text-[#0F6B75]">Teachers Management</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search teachers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6B75] bg-white transition-all shadow-sm"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setOpen(true)}
            className="w-full sm:w-auto bg-[#0F6B75] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0c565e] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            + Add Staff
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">

        {/* ================= Teacher Table ================= */}
        <div className="overflow-x-auto">
          {fetchingTeachers ? (
            <p className="m-5 text-gray-600">Loading teachers...</p>
          ) : filteredTeachers.length === 0 ? (
            <p className="m-5 text-gray-600">No teachers found matching your search.</p>
          ) : (
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-gray-50/50 sticky top-0 z-10 shadow-sm">
                <tr className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Qualification</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher._id}
                    className="border-b last:border-b-0 hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="py-3 px-6 text-gray-800 font-medium">{teacher.name}</td>
                    <td className="py-3 px-6 text-gray-600">{teacher.qualification}</td>
                    <td className="py-3 px-6 text-gray-600">{teacher.userId?.email}</td>
                    <td className="py-3 px-6 text-gray-600">{teacher.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ================= Modal ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-5 sm:p-6 rounded-xl w-full max-w-sm relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close */}
            <button
              onClick={() => {
                setOpen(false);
                setError("");
                setSuccess("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-[#0F6B75] mb-2">
              Add Staff
            </h2>

            <p className="text-sm text-gray-500 pb-4">
              Enter the email address to invite a new staff member.
            </p>

            {/* Email Input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@example.com"
              className="w-full border border-gray-200 p-2.5 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#0F6B75] focus:border-transparent transition-all"
            />

            {/* Error Message */}
            {error && <p className="text-sm text-red-600 font-medium mb-2 mt-1">{error}</p>}

            {/* Success Message */}
            {success && <p className="text-sm text-green-600 font-medium mb-2 mt-1">{success}</p>}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#0F6B75] text-white text-sm font-medium py-2.5 rounded-md hover:bg-[#0c565e] disabled:opacity-50 disabled:cursor-not-allowed mt-4 transition-colors cursor-pointer shadow-sm"
            >
              {loading ? "Sending Invitation..." : "Send Invitation"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeacher;
