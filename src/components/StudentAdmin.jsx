import { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus, X } from "lucide-react";

const StudentAdmin = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [students, setStudents] = useState([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);

  // ---------------- Email Validation ----------------
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ---------------- Fetch Students ----------------
  const fetchStudents = async () => {
    setFetchingStudents(true);
    try {
      const response = await axios.get("http://localhost:5000/api/student");
      setStudents(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setFetchingStudents(false);
    }
  };

  useEffect(() => {
    fetchStudents();
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
        "http://localhost:5000/api/admin/invite-student",
        { email }
      );

      setSuccess(response.data?.message || "Invitation sent successfully");
      setEmail("");

      // Refresh student list after successful invite
      fetchStudents();
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
    <div className="p-3 sm:p-6 bg-gray-100">
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 relative">
        {/* Add Student Button */}
        <button
          onClick={() => setOpen(true)}
          className="
            bg-teal-700 text-white
            px-4 py-2 rounded-lg
            hover:bg-teal-600 transition
            mb-4
          "
        >
          Add Student
        </button>

        {/* ================= Student Table ================= */}
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold text-teal-700 mb-4">
            Current Students
          </h2>

          {fetchingStudents ? (
            <p>Loading students...</p>
          ) : students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Roll No</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Class</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4">{student.rollNo}</td>
                    <td className="py-2 px-4">{student.userId?.email}</td>
                    <td className="py-2 px-4">{student.class}</td>
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
              Add Student
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Enter the email address to invite a student
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
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

            {/* Success Message */}
            {success && <p className="text-sm text-green-600 mb-2">{success}</p>}

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

export default StudentAdmin;
