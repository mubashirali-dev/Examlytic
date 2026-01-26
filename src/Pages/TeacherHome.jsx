import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MyClass from "../components/MyClass";
import QuickAction from "../components/QuickAction";
import TeacherClass from "../components/TeacherClass";

const TeacherHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const classId = searchParams.get("classId");

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

  const selectedClass = classId
    ? classes.find((c) => c.id === Number(classId))
    : null;

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
    // URL param stays same, just content updates
  };

  const handleDeleteClass = (id) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    // If the deleted class was selected (visible), return to home
    if (selectedClass && selectedClass.id === id) {
      setSearchParams({});
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
            onViewClass={(cls) => setSearchParams({ classId: cls.id })}
          />
          <QuickAction onCreateClass={handleAddClass} />
        </>
      )}
    </>
  );
};

export default TeacherHome;
