import { useState } from "react";
import TableStudent from "../components/TableStudent";
import { X, Search } from "lucide-react";

// Mock data for UI demonstration
const mockStudents = [
  { id: 1, name: "Ali Ahmed", email: "ali@edu.pk", rollNo: "BSCS-01", department: "Computer Science", semester: "4th", teacher: "Ahmad Hasan" },
  { id: 2, name: "Fatima Noor", email: "fatima@edu.pk", rollNo: "BSCS-02", department: "Computer Science", semester: "4th", teacher: "Ahmad Hasan" },
  { id: 3, name: "Usman Raza", email: "usman@edu.pk", rollNo: "BSSE-15", department: "Software Engineering", semester: "2nd", teacher: "Sarah Khan" },
  { id: 4, name: "Zainab Ali", email: "zainab@edu.pk", rollNo: "BSIT-09", department: "Information Tech", semester: "6th", teacher: "Bilal Tariq" },
  { id: 5, name: "Hamza Tariq", email: "hamza@edu.pk", rollNo: "BSCS-22", department: "Computer Science", semester: "8th", teacher: "Ayesha Khan" },
  { id: 6, name: "Aisha Rehman", email: "aisha@edu.pk", rollNo: "BSIT-12", department: "Information Tech", semester: "4th", teacher: "Bilal Tariq" },
  { id: 7, name: "Omer Farooq", email: "omer@edu.pk", rollNo: "BSSE-34", department: "Software Engineering", semester: "6th", teacher: "Sarah Khan" },
  { id: 8, name: "Saad Ali", email: "saad@edu.pk", rollNo: "BSCS-19", department: "Computer Science", semester: "2nd", teacher: "Ahmad Hasan" },
  { id: 9, name: "Maryam Khalid", email: "maryam@edu.pk", rollNo: "BSIT-05", department: "Information Tech", semester: "8th", teacher: "Bilal Tariq" },
  { id: 10, name: "Abdullah Khan", email: "abdullah@edu.pk", rollNo: "BSSE-08", department: "Software Engineering", semester: "4th", teacher: "Sarah Khan" },
];

const AdminStudents = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudents.filter(s => 
    [s.name, s.email, s.rollNo, s.department, s.teacher]
      .some(val => val?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = async () => {
    // Mock submit behavior
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("Student invitation sent successfully!");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-[1.75rem] font-bold text-[#0F6B75]">Students Management</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search students..." 
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
            + Add Student
          </button>
        </div>
      </div>

      <div className="mb-6">
        <TableStudent title="Current Students" students={filteredStudents} />
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
              Add Student
            </h2>

            <p className="text-sm text-gray-500 pb-4">
              Enter the email address to invite a new student.
            </p>

            {/* Email Input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@edu.pk"
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

export default AdminStudents;
