import { useState } from "react";
import Navbar from "../components/Navbar";
import SlideBar from "../components/Slidebar";
import StudentMyClass from "../components/StudentMyClass";
import StudentQuickAction from "../components/StudentQuickAction";
import StudentClass from "../components/StudentClass";

const StudentHome = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  // Initial Joined Class Data (Mock)
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Introduction to CS",
      section: "BSCS 7A",
      image: "/class.png",
    },
  ]);

  const handleHomeClick = () => {
    setSelectedClass(null);
  };

  const handleJoinClass = (classCode) => {
    // Mock logic to add a class based on code
    console.log("Joining class with code:", classCode);

    // Use this to fetch class details from backend
    const newClass = {
      id: Date.now(),
      title: `Class ${classCode}`,
      section: "Joined Class",
      image: "/class.png",
    };

    setClasses((prev) => [...prev, newClass]);
    alert(`Successfully joined class: ${classCode}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleMobileSidebar} />
      <div className="flex flex-1 pt-16">
        <SlideBar
          role="Student"
          isMobileOpen={isMobileSidebarOpen}
          closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
          onHomeClick={handleHomeClick}
        />
        <main className="flex-1 p-4 md:p-10 md:px-20 ml-0 md:ml-20 transition-all duration-300">
          {selectedClass ? (
            <StudentClass
              classData={selectedClass}
              onBack={() => setSelectedClass(null)}
            />
          ) : (
            <>
              <StudentMyClass
                classes={classes}
                onViewClass={(cls) => setSelectedClass(cls)}
                onJoinClass={handleJoinClass}
              />
              <StudentQuickAction onJoinClass={handleJoinClass} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentHome;
