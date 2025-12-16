import { useState, useEffect, useRef } from "react";
import ClassCard from "./ClassCard";
import JoinClass from "./JoinClass";
import { Plus } from "lucide-react";

const StudentMyClass = ({ onViewClass, classes, onJoinClass }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false);

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
                      setIsJoinClassOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-white hover:bg-[#0c565e] font-bold"
                  >
                    Join Class
                  </button>
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
              // No onDelete prop for students
            />
          ))}
          {classes.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              You haven't joined any classes yet. Click "Join Class" to get
              started.
            </div>
          )}
        </div>
      </div>

      <JoinClass
        isOpen={isJoinClassOpen}
        onClose={() => setIsJoinClassOpen(false)}
        onJoin={onJoinClass}
      />
    </>
  );
};

export default StudentMyClass;
