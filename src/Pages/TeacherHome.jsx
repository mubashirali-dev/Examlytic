import { useState } from "react";
import MyClass from "../components/MyClass";
import QuickAction from "../components/QuickAction";
import TeacherClass from "../components/TeacherClass";

const TeacherHome = () => {
  const [selectedClass, setSelectedClass] = useState(null);

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
      prev.map((c) => (c.id === updatedClass.id ? updatedClass : c)),
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
    <>
      {selectedClass ? (
        <TeacherClass classData={selectedClass} onUpdate={handleUpdateClass} />
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
    </>
  );
};

export default TeacherHome;
