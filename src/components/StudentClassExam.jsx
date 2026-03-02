import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, BookOpen, PenTool } from "lucide-react";
import TakeExam from "./TakeExam";

const API_BASE_URL = "http://localhost:5000/api";

const StudentClassExam = () => {
  const [takingExam, setTakingExam] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableExams = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/student-exams/available`,
        );
        const apiExams = res.data?.data || [];

        const mapped = apiExams.map((exam) => {
          const start = exam.startTime ? new Date(exam.startTime) : null;

          const date =
            start &&
            start.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

          const startTime =
            start &&
            start.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

          const mcqQuestions = exam.mcqQuestions || [];
          const shortQuestions = exam.shortQuestions || [];

          const questionsList = [
            ...mcqQuestions.map((q, idx) => ({
              id: `mcq-${idx}`,
              text: q.question,
              type: "mcq",
              marks: q.marks,
              options: q.options,
            })),
            ...shortQuestions.map((q, idx) => ({
              id: `short-${idx}`,
              text: q.question,
              type: "subjective",
              marks: q.marks,
              options: [],
            })),
          ];

          const totalMarks =
            exam.totalMarks ??
            questionsList.reduce((sum, q) => sum + (q.marks || 0), 0);

          return {
            id: exam._id,
            title: exam.title,
            subject: "",
            questions: questionsList.length,
            status: "Available",
            date: date || "",
            startTime: startTime || "",
            duration: exam.durationMinutes || 0,
            totalMarks,
          };
        });

        setExams(mapped);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch student exams:", err);
        setError("Failed to load exams");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableExams();
  }, []);

  const handleTakeExam = async (exam) => {
    try {
      setLoading(true);
      setError(null);


      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const studentId = currentUser?.id || currentUser?._id;

      const attemptRes = await axios.post(
        `${API_BASE_URL}/student-exams/${exam.id}/start`,
        { studentId },
      );
      const attempt = attemptRes.data?.data;
      const res = await axios.get(`${API_BASE_URL}/student-exams/${exam.id}`);
      const backendExam = res.data?.data;

      if (!backendExam) {
        throw new Error("Exam not found");
      }

      const mcqQuestions = backendExam.mcqQuestions || [];
      const shortQuestions = backendExam.shortQuestions || [];

      const questionsList = [
        ...mcqQuestions.map((q, idx) => ({
          id: `mcq-${idx}`,
          text: q.question,
          type: "mcq",
          marks: q.marks,
          options: q.options,
        })),
        ...shortQuestions.map((q, idx) => ({
          id: `short-${idx}`,
          text: q.question,
          type: "subjective",
          marks: q.marks,
          options: [],
        })),
      ];

      const totalMarks =
        backendExam.totalMarks ??
        questionsList.reduce((sum, q) => sum + (q.marks || 0), 0);

      const start = backendExam.startTime
        ? new Date(backendExam.startTime)
        : null;

      const date =
        start &&
        start.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

      const startTime =
        start &&
        start.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

      const examForTaking = {
        id: backendExam._id,
        title: backendExam.title,
        subject: "",
        questions: questionsList.length,
        status: "Available",
        date: date || "",
        startTime: startTime || "",
        duration: backendExam.durationMinutes || 0,
        totalMarks,
        questionsList,
        attemptId: attempt?._id,
      };

      setTakingExam(examForTaking);
    } catch (err) {
      console.error("Failed to load exam for student:", err);
      setError("Failed to load exam. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinishExam = () => {
    setTakingExam(null);
  };

  if (takingExam) {
    return <TakeExam exam={takingExam} onFinish={handleFinishExam} />;
  }

  if (loading) {
    return <p>Loading exams...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
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
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${exam.status === "Available"
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
                    className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer ${exam.status === "Available"
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
