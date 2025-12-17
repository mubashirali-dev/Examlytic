import { useState, useEffect, useRef } from "react";
import {
  Home,
  ClipboardList,
  CheckSquare,
  BarChart2,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SlideBar = ({ isMobileOpen, closeMobileSidebar, onHomeClick, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
        if (window.innerWidth < 768) {
          // Close on mobile click outside
          closeMobileSidebar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMobileSidebar]);

  let menuItems = [];

  if (role === "Teacher") {
    menuItems = [
      { icon: Home, label: "Home" },
      { icon: ClipboardList, label: "Exams" },
      { icon: CheckSquare, label: "Results" },
      { icon: BarChart2, label: "Reports" },
    ];
  } else if (role === "Student") {
    menuItems = [
      { icon: Home, label: "Home" },
      { icon: CheckSquare, label: "My Results" },
    ];
  } else {
    // Default or fallback
    menuItems = [{ icon: Home, label: "Home" }];
  }

  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/login", { replace: true });
  };

  const bottomItems = [
    { icon: LogOut, label: "Sign Out", action: handleSignOut },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeMobileSidebar}
        ></div>
      )}

      <div
        ref={sidebarRef}
        className={`h-[calc(100vh-4rem)] bg-[#0F6B75] text-white fixed left-0 top-16 transition-all duration-300 z-40 flex flex-col justify-between py-6 
            ${isOpen || isMobileOpen ? "w-64" : "w-20"}
            ${
              isMobileOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }
        `}
      >
        {/* Toggle Button (Desktop only) */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4 bg-white text-[#0F6B75] p-1 rounded-full shadow-md hover:bg-gray-100 border border-gray-200 z-50 hidden md:flex"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex flex-col gap-2 mt-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-6 cursor-pointer py-3 transition-colors relative group ${
                activeItem === item.label
                  ? "bg-white/20 border-r-4 border-white"
                  : "hover:bg-white/10"
              }`}
              onClick={() => {
                setIsOpen(true);
                setActiveItem(item.label);
                if (item.label === "Home" && onHomeClick) {
                  onHomeClick();
                }
              }}
            >
              <item.icon size={24} className="min-w-[24px]" />
              <span
                className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-300 ${
                  isOpen || isMobileOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.label}
              </span>
              {!isOpen && !isMobileOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 hidden md:block">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {bottomItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 cursor-pointer hover:bg-white/10 py-3 transition-colors relative group"
              onClick={() => {
                setIsOpen(true);
                if (item.action) item.action();
              }}
            >
              <item.icon size={24} className="min-w-[24px]" />
              <span
                className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-300 ${
                  isOpen || isMobileOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.label}
              </span>
              {!isOpen && !isMobileOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 hidden md:block">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideBar;
