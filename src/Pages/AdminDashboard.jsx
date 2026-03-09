import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, FileText, Settings, GraduationCap } from "lucide-react";
import TableTeacher from "../components/TableTeacher";

// Mock data for UI layout demonstration
const mockStats = {
  totalTeachers: 145,
  totalStudents: 3250,
  activeExams: 18,
  totalClasses: 84
};

const mockTeachers = [
  { id: 1, name: "Ahmad Hasan", department: "Computer Science", email: "ahmad@edu.pk", phone: "+92 300 1234567", qualification: "Ph.D. Computer Science", experience: "10 Years", classes: 4, students: 120, status: "Active" },
  { id: 2, name: "Sara Ahmed", department: "Mathematics", email: "sara@edu.pk", phone: "+92 333 7654321", qualification: "M.Phil Mathematics", experience: "5 Years", classes: 3, students: 95, status: "Active" },
  { id: 3, name: "Bilal Tariq", department: "Physics", email: "bilal@edu.pk", phone: "+92 321 9876543", qualification: "M.Sc Physics", experience: "3 Years", classes: 2, students: 60, status: "Pending" },
  { id: 4, name: "Ayesha Khan", department: "Chemistry", email: "ayesha@edu.pk", phone: "+92 301 3456789", qualification: "Ph.D. Chemistry", experience: "8 Years", classes: 5, students: 150, status: "Active" },
  { id: 5, name: "Zain Ali", department: "English", email: "zain@edu.pk", phone: "+92 345 5432109", qualification: "M.A English", experience: "4 Years", classes: 3, students: 85, status: "Active" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto pb-10">
      
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-[1.75rem] font-bold text-[#0F6B75]">Dashboard Overview</h2>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => console.log("Open Invite Flow")}
            className="bg-[#0F6B75] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0c565e] transition-colors shadow-sm cursor-pointer"
          >
            + Add Teacher
          </button>
        </div>
      </div>

      {/* Metric Cards Grid - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-[#0F6B75]">
        
        {/* Total Teachers (Highlight Card) */}
        <div className="bg-[#0F6B75] text-white p-6 rounded-2xl shadow-md min-h-[140px] flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <Users size={24} />
            <span className="font-medium text-teal-50">Total Teachers</span>
          </div>
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2 mt-4">{mockStats.totalTeachers}</h2>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <GraduationCap size={24} className="text-teal-600" />
            <span className="font-medium">Total Students</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{mockStats.totalStudents}</h2>
        </div>

        {/* Active Exams */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <FileText size={24} className="text-teal-600" />
            <span className="font-medium">Active Exams</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{mockStats.activeExams}</h2>
        </div>

        {/* Total Classes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Settings size={24} className="text-teal-600" />
            <span className="font-medium">Total Classes</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{mockStats.totalClasses}</h2>
        </div>
      </div>

      {/* Recent Teachers Preview Table */}
      <div className="mb-6">
        <TableTeacher title="Recent Teachers" teachers={mockTeachers.slice(0, 5)} />
      </div>

    </div>
  );
};

export default AdminDashboard;
