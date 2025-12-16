import React from "react";
import { Calendar, Clock, BookOpen, PenTool } from "lucide-react";
import TakeExam from "./TakeExam";

const StudentClassExam = () => {
  const [takingExam, setTakingExam] = React.useState(null);

  // Mock Data for Student Exams
  const exams = [
    {
      id: 1,
      title: "Calculus Midterm",
      subject: "Mathematics",
      questions: 20,
      status: "Available",
      date: "Dec 12, 2025",
      startTime: "10:00 AM",
      duration: 60,
      totalMarks: 50,
      questionsList: [
        {
          id: 101,
          text: "What is the derivative of x^2?",
          type: "mcq",
          marks: 5,
          options: ["x", "2x", "x^2", "2"],
          correctOption: 1,
        },
        {
          id: 102,
          text: "Calculate the integral of 2x dx.",
          type: "mcq",
          marks: 5,
          options: ["x^2 + C", "2x^2 + C", "x + C", "2x"],
          correctOption: 0,
        },
        {
          id: 103,
          text: "What is the value of pi?",
          type: "mcq",
          marks: 5,
          options: ["3.14", "3.14159", "22/7", "All of above"],
          correctOption: 3,
        },
      ],
    },
    {
      id: 2,
      title: "Physics Quiz 1",
      subject: "Physics",
      questions: 15,
      status: "Upcoming",
      date: "Dec 15, 2025",
      startTime: "09:00 AM",
      duration: 45,
      totalMarks: 30,
      questionsList: [],
    },
    {
      id: 3,
      title: "English Literature",
      subject: "English",
      questions: 10,
      status: "Completed",
      date: "Dec 10, 2025",
      startTime: "10:00 AM",
      duration: 90,
      totalMarks: 20,
      score: 18,
      questionsList: [],
    },
  ];

  const handleTakeExam = (exam) => {
    setTakingExam(exam);
  };

  const handleFinishExam = () => {
    setTakingExam(null);
  };

  if (takingExam) {
    return <TakeExam exam={takingExam} onFinish={handleFinishExam} />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#0F6B75] mb-6">Available Exams</h2>
      <div className="grid grid-cols-1 gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-gray-900">
                    {exam.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      exam.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : exam.status === "Upcoming"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {exam.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-3">
                  {exam.subject}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-[#0F6B75]" />
                    <span>
                      {exam.date} at {exam.startTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-[#0F6B75]" />
                    <span>{exam.duration} mins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={16} className="text-[#0F6B75]" />
                    <span>
                      {exam.questionsList?.length || exam.questions} Qs (
                      {exam.totalMarks} Marks)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {exam.status === "Completed" ? (
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      Your Score
                    </p>
                    <p className="text-xl font-bold text-[#0F6B75]">
                      {exam.score} / {exam.totalMarks}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => handleTakeExam(exam)}
                    disabled={exam.status !== "Available"}
                    className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                      exam.status === "Available"
                        ? "bg-[#0F6B75] text-white hover:bg-[#0c565e] shadow-sm"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {exam.status === "Available" ? (
                      <PenTool size={18} />
                    ) : (
                      <Clock size={18} />
                    )}
                    {exam.status === "Available" ? "Take Exam" : "Scheduled"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentClassExam;
