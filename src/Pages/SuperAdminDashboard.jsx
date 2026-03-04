import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, LayoutDashboard, Settings } from "lucide-react";
import ConfirmationModal from "../components/ConfirmationModal";
import AdminTable from "../components/AdminTable";

// Mock data for UI layout demonstration
const mockStats = {
  totalAdmins: 42,
  totalTeachers: 156,
  totalStudents: 3450,
  totalExams: 890
};

const mockAdmins = [
  { id: 1, name: "Ali Khan", institution: "Punjab Group of Colleges", email: "ali@punjab.edu", date: "Oct 12, 2026", status: "Active" },
  { id: 2, name: "Ayesha Malik", institution: "KIPS College", email: "ayesha@kips.edu", date: "Nov 05, 2026", status: "Active" },
  { id: 3, name: "Usman Tariq", institution: "Unique Group", email: "usman@unique.edu", date: "Dec 18, 2026", status: "Suspended" },
  { id: 4, name: "Fatima Noor", institution: "Concordia College", email: "fatima@concordia.edu", date: "Jan 10, 2027", status: "Active" },
  { id: 5, name: "Zainab Ali", institution: "Roots Millennium", email: "zainab@roots.edu", date: "Feb 22, 2027", status: "Active" },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({ isOpen: false, type: "", admin: null });

  const handleActionClick = (type, admin) => {
    setModalState({ isOpen: true, type, admin });
  };

  const confirmAction = () => {
    console.log(`Confirmed ${modalState.type} for admin ${modalState.admin?.name}`);
    // Insert backend API call here later
    setModalState({ isOpen: false, type: "", admin: null });
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      
      {/* Page Title & Filter (mimicking the "My Results" header) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-[1.75rem] font-bold text-[#0F6B75]">Dashboard Overview</h2>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/superadmin/create-admin")}
            className="bg-[#0F6B75] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0c565e] transition-colors shadow-sm cursor-pointer"
          >
            + Create New Admin
          </button>
        </div>
      </div>

      {/* Metric Cards Grid - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-[#0F6B75]">
        {/* Primary Highlighted Card */}
        <div className="bg-[#0F6B75] text-white p-6 rounded-2xl shadow-md min-h-[140px] flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <Users size={24} />
            <span className="font-medium text-teal-50">Total Admins</span>
          </div>
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2 mt-4">{mockStats.totalAdmins}</h2>
          </div>
        </div>

        {/* Standard White Cards matching StudentResult */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <LayoutDashboard size={24} className="text-teal-600" />
            <span className="font-medium">Total Teachers</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{mockStats.totalTeachers}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Users size={24} className="text-teal-600" />
            <span className="font-medium">Total Students</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{mockStats.totalStudents}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Settings size={24} className="text-teal-600" />
            <span className="font-medium">Total Exams</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{mockStats.totalExams}</h2>
        </div>
      </div>

      {/* Recent Admins Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-[1.1rem] font-bold text-[#012f36]">
            Recent Admins
          </h3>
          <button 
          onClick={() => navigate("/superadmin/admins")}
          className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer"
        >
          View All →
        </button>
        </div>
        
        <AdminTable admins={mockAdmins.slice(0, 5)} onActionClick={handleActionClick} />
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: "", admin: null })}
        onConfirm={confirmAction}
        title={modalState.type === 'suspend' ? 'Suspend Admin' : modalState.type === 'unsuspend' ? 'Unsuspend Admin' : 'Delete Admin'}
        message={`Are you sure you want to ${modalState.type} ${modalState.admin?.name} (${modalState.admin?.institution})?`}
        confirmText={modalState.type === 'suspend' ? 'Suspend' : modalState.type === 'unsuspend' ? 'Unsuspend' : 'Delete'}
        isDanger={modalState.type === 'delete'}
      />
    </div>
  );
};

export default SuperAdminDashboard;
