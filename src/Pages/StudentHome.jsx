import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StudentMyClass from "../components/StudentMyClass";
import StudentQuickAction from "../components/StudentQuickAction";
import StudentClass from "../components/StudentClass";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const StudentHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const classId = searchParams.get("classId");
  
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/class`);
        const apiClasses = res.data?.data || [];

        const mapped = apiClasses.map((cls) => ({
          id: cls._id,
          title: cls.className,
          section: cls.courseTitle || cls.classCode || "",
          image: "/class.png",
          // Extra fields for ClassCard
          className: cls.className,
          courseTitle: cls.courseTitle,
          semester: cls.semester,
          creditHours: cls.creditHours,
        }));

        setClasses(mapped);
      } catch (err) {
        console.error("Failed to fetch classes for student:", err);
      }
    };

    fetchClasses();
  }, []);

  const selectedClass = classId
    ? classes.find((c) => c.id === classId)
    : null;

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
    setSearchParams({}); // Go back to list view
  };

  return (
    <>
      {selectedClass ? (
        <StudentClass
          classData={selectedClass}
          onBack={() => setSearchParams({})}
          onLeaveClass={handleLeaveClass}
        />
      ) : (
        <>
          <StudentMyClass
            classes={classes}
            onViewClass={(cls) => setSearchParams({ classId: cls.id })}
            onJoinClass={handleJoinClass}
          />
          <StudentQuickAction onJoinClass={handleJoinClass} />
        </>
      )}
    </>
  );
};

export default StudentHome;
