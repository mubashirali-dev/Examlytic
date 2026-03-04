import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/AdminTable";
import ConfirmationModal from "../components/ConfirmationModal";
import DropDownMenu from "../components/DropDownMenu";

const mockAdmins = [
  { id: 1, name: "Ali Khan", institution: "Punjab Group of Colleges", email: "ali@punjab.edu", date: "Oct 12, 2026", status: "Active" },
  { id: 2, name: "Ayesha Malik", institution: "KIPS College", email: "ayesha@kips.edu", date: "Nov 05, 2026", status: "Active" },
  { id: 3, name: "Usman Tariq", institution: "Unique Group", email: "usman@unique.edu", date: "Dec 18, 2026", status: "Suspended" },
  { id: 4, name: "Fatima Noor", institution: "Concordia College", email: "fatima@concordia.edu", date: "Jan 10, 2027", status: "Active" },
  { id: 5, name: "Zainab Ali", institution: "Roots Millennium", email: "zainab@roots.edu", date: "Feb 22, 2027", status: "Active" },
  { id: 6, name: "Hassan Raza", institution: "LGS", email: "hassan@lgs.edu", date: "Mar 01, 2027", status: "Active" },
  { id: 7, name: "Sana Tariq", institution: "Beaconhouse", email: "sana@beaconhouse.edu", date: "Apr 15, 2027", status: "Suspended" },
];

const SuperAdminAdmins = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [modalState, setModalState] = useState({ isOpen: false, type: "", admin: null });

  // Filter Logic
  const filteredAdmins = mockAdmins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          admin.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All Statuses" || admin.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleActionClick = (type, admin) => {
    setModalState({ isOpen: true, type, admin });
  };

  const confirmAction = () => {
    console.log(`Confirmed ${modalState.type} for admin ${modalState.admin?.name}`);
    // Backend API Logic goes here
    setModalState({ isOpen: false, type: "", admin: null });
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-[1.75rem] font-bold text-[#0F6B75]">Platform Admins</h2>
          <p className="text-gray-500 mt-1">Manage all institution administrators across Examlytic</p>
        </div>
        
        <button 
          onClick={() => navigate("/superadmin/create-admin")}
          className="bg-[#0F6B75] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0c565e] transition-colors shadow-sm cursor-pointer flex items-center gap-2"
        >
          <Plus size={16} />
          Create New Admin
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {/* Toolbar: Search and Filter */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, institution, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/20 focus:border-[#0F6B75] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={18} className="text-gray-400" />
            <DropDownMenu 
              options={["All Statuses", "Active", "Suspended"]}
              value={filterStatus}
              onChange={(val) => setFilterStatus(val)}
            />
          </div>
        </div>

        {/* AdminTable */}
        <AdminTable admins={filteredAdmins} onActionClick={handleActionClick} />

        {filteredAdmins.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No administrators found matching your search or filter criteria.
          </div>
        )}
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

export default SuperAdminAdmins;
