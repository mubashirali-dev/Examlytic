import { useState, useEffect, useRef } from "react";
import ClassCard from "./ClassCard";
import CreateClass from "./CreateClass";
import ConfirmationModal from "./ConfirmationModal";
import { Plus } from "lucide-react";

const MyClass = ({ onViewClass, classes, onDeleteClass, onCreateClass }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Delete Handlers
  const handleDeleteClick = (classItem) => {
    setClassToDelete(classItem);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (classToDelete) {
      onDeleteClass(classToDelete.id);
      setIsDeleteModalOpen(false);
      setClassToDelete(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-10 md:pt-6 relative border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F6B75]">My Classes</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="bg-[#0F6B75] text-white p-2 rounded-full hover:bg-[#0c565e] transition-colors shadow-md"
            >
              <Plus size={24} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0F6B75] rounded-xl shadow-xl z-50 overflow-hidden border border-[#0c565e]">
                <div className="py-0">
                  <button
                    onClick={() => {
                      setIsCreateClassOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-white hover:bg-[#0c565e] font-bold"
                  >
                    New Class
                  </button>
                  {/* <button className="block w-full text-left px-4 py-3 text-white hover:bg-[#0c565e] font-bold border-b border-white">
                    New Exam
                  </button>
                  <button className="block w-full text-left px-4 py-3 text-white hover:bg-[#0c565e] font-bold">
                    Upload Paper
                  </button> */}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {classes.map((cls) => (
            <ClassCard
              key={cls.id}
              {...cls}
              onView={() => onViewClass(cls)}
              onDelete={() => handleDeleteClick(cls)}
            />
          ))}
        </div>
      </div>

      <CreateClass
        isOpen={isCreateClassOpen}
        onClose={() => setIsCreateClassOpen(false)}
        onCreate={onCreateClass}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Class"
        message={`Are you sure you want to delete "${classToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        isDanger={true}
      />
    </>
  );
};

export default MyClass;
