import { useState } from "react";
import StudentMyClass from "../components/StudentMyClass";
import StudentQuickAction from "../components/StudentQuickAction";
import StudentClass from "../components/StudentClass";

const StudentHome = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  // Initial Joined Class Data (Mock)
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Introduction to CS",
      section: "BSCS 7A",
      image: "/class.png",
    },
  ]);

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

  const handleLeaveClass = (classId) => {
    setClasses((prev) => prev.filter((c) => c.id !== classId));
    setSelectedClass(null);
  };

  return (
    <>
      {selectedClass ? (
        <StudentClass
          classData={selectedClass}
          onBack={() => setSelectedClass(null)}
          onLeaveClass={handleLeaveClass}
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
    </>
  );
};

export default StudentHome;
