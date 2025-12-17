import { useState } from "react";
import Navbar from "../components/Navbar";
import SlideBar from "../components/Slidebar";
import MyClass from "../components/MyClass";
import QuickAction from "../components/QuickAction";
import TeacherClass from "../components/TeacherClass";

const TeacherHome = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  // Initial Class Data
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Entrepreneurship",
      section: "BSCS 7A MOR",
      description: "Introduction to Entrepreneurship and Business Development.",
      image: "/class.png",
    },
    {
      id: 2,
      title: "Entrepreneurship",
      section: "BSCS 7A MOR",
      description: "Introduction to Entrepreneurship and Business Development.",
      image: "/class.png",
    },
    {
      id: 3,
      title: "Entrepreneurship",
      section: "BSCS 7A MOR",
      description: "Introduction to Entrepreneurship and Business Development.",
      image: "/class.png",
    },
    {
      id: 4,
      title: "Entrepreneurship",
      section: "BSCS 7A MOR",
      description: "Introduction to Entrepreneurship and Business Development.",
      image: "/class.png",
    },
    {
      id: 5,
      title: "Entrepreneurship",
      section: "BSCS 7A MOR",
      description: "Introduction to Entrepreneurship and Business Development.",
      image: "/class.png",
    },
  ]);

  const handleHomeClick = () => {
    setSelectedClass(null);
  };

  const handleAddClass = (newClassData) => {
    const newClass = {
      id: Date.now(), // Simple unique ID
      title: newClassData.name,
      section: newClassData.section,
      description: newClassData.description, // Added description
      image: "/class.png", // Default image
    };
    setClasses((prev) => [...prev, newClass]);
  };

  const handleUpdateClass = (updatedClass) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === updatedClass.id ? updatedClass : c))
    );
    // Update selected class if it's the one being edited
    if (selectedClass && selectedClass.id === updatedClass.id) {
      setSelectedClass(updatedClass);
    }
  };

  const handleDeleteClass = (id) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    // If the deleted class was selected, return to home
    if (selectedClass && selectedClass.id === id) {
      setSelectedClass(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleMobileSidebar} />
      <div className="flex flex-1 pt-16">
        <SlideBar
          role="Teacher"
          isMobileOpen={isMobileSidebarOpen}
          closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
          onHomeClick={handleHomeClick}
        />
        <main className="flex-1 p-4 md:p-10 md:px-20 ml-0 md:ml-20 transition-all duration-300">
          {selectedClass ? (
            <TeacherClass
              classData={selectedClass}
              onUpdate={handleUpdateClass}
            />
          ) : (
            <>
              <MyClass
                classes={classes}
                onDeleteClass={handleDeleteClass}
                onCreateClass={handleAddClass}
                onViewClass={(cls) => setSelectedClass(cls)}
              />
              <QuickAction onCreateClass={handleAddClass} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherHome;
