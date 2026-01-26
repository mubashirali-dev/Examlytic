import React, { useState } from "react";
import { Trash } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

const TeacherClassStudents = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Mubashir Ali",
      image:
        "https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      name: "Muhammad Kamran",
      image:
        "https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "Ahsan Waheed",
      image:
        "https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "Mubashir Ali",
      image:
        "https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "Muhammad Kamran",
      image:
        "https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 6,
      name: "Ahsan Waheed",
      image:
        "https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 7,
      name: "Mubashir Ali",
      image:
        "https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState(null);

  const handleRemoveClick = (student) => {
    setStudentToRemove(student);
    setIsModalOpen(true);
  };

  const confirmRemove = () => {
    setStudents((prev) => prev.filter((s) => s.id !== studentToRemove.id));
    setIsModalOpen(false);
    setStudentToRemove(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0F6B75]">Students</h2>
        <span className="text-[#0F6B75] font-bold">
          {students.length} Students
        </span>
      </div>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-4">
              <img
                src={student.image}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              />
              <span className="text-[#0F6B75] text-lg">{student.name}</span>
            </div>
            <button
              onClick={() => handleRemoveClick(student)}
              className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              title="Remove Student"
            >
              <Trash size={20} />
            </button>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmRemove}
        title="Remove Student"
        message={`Are you sure you want to remove ${studentToRemove?.name} from the class?`}
        confirmText="Remove"
        isDanger={true}
      />
    </div>
  );
};

export default TeacherClassStudents;
