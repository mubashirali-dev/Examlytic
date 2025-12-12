import React from "react";

const TeacherClassStudents = () => {
  const students = [
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
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0F6B75]">Students</h2>
        <span className="text-[#0F6B75] font-bold">36 Students</span>
      </div>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <img
              src={student.image}
              alt={student.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
            <span className="text-[#0F6B75] text-lg">{student.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherClassStudents;
