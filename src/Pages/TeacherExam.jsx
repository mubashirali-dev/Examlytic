import React, { useState } from "react";
import ManageExamTable from "../components/ManageExamTable";
import CreateExam from "../components/CreateExam";
import ViewExam from "../components/ViewExam";
import ConfirmationModal from "../components/ConfirmationModal";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherExam = () => {
  const navigate = useNavigate();
  const [filterSubject, setFilterSubject] = useState("All Subjects");
  const [filterClass, setFilterClass] = useState("All Classes");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  // Modes
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // Mock Data (State)
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Midterm Physics",
      subject: "Physics",
      class: "BSCS 7A",
      questions: 25,
      questionsList: [], // Added for compatibility
      status: "Published",
      date: "Oct 24, 2024, 10:00 AM",
      startTime: "10:00",
      endTime: "12:00",
      duration: 120,
    },
    {
      id: 2,
      title: "Final Math",
      subject: "Math",
      class: "BSCS 7B",
      questions: 40,
      questionsList: [],
      status: "Scheduled",
      date: "Dec 10, 2024, 09:00 AM",
      startTime: "09:00",
      endTime: "11:00",
      duration: 120,
    },
    {
      id: 3,
      title: "Quiz 1 Chemistry",
      subject: "Chemistry",
      class: "BSCS 7A",
      questions: 10,
      questionsList: [],
      status: "Completed",
      date: "Sep 15, 2024, 11:30 AM",
      startTime: "11:30",
      endTime: "12:30",
      duration: 60,
    },
    {
      id: 4,
      title: "Programming Basics",
      subject: "CS",
      class: "BSSE 2A",
      questions: 15,
      questionsList: [],
      status: "Draft",
      date: "Nov 05, 2024, 02:00 PM",
      startTime: "14:00",
      endTime: "15:00",
      duration: 60,
    },
  ]);

  // Derive unique options for filters
  const subjects = ["All Subjects", ...new Set(exams.map((e) => e.subject))];
  const classes = ["All Classes", ...new Set(exams.map((e) => e.class))];
  const statuses = ["All Statuses", ...new Set(exams.map((e) => e.status))];

  // Filter Logic
  const filteredExams = exams.filter((exam) => {
    const matchSubject =
      filterSubject === "All Subjects" || exam.subject === filterSubject;
    const matchClass =
      filterClass === "All Classes" || exam.class === filterClass;
    const matchStatus =
      filterStatus === "All Statuses" || exam.status === filterStatus;
    return matchSubject && matchClass && matchStatus;
  });

  const handleView = (exam) => {
    setSelectedExam(exam);
    setIsViewMode(true);
  };

  const handleEdit = (exam) => {
    // Ensure questions array exists for CreateExam
    const examToEdit = {
        ...exam,
        questions: exam.questionsList || [] 
        // If we were real, we'd fetch the full exam details here
    };
    setSelectedExam(examToEdit);
    setIsEditMode(true);
  };

  const handleDelete = (exam) => {
    setSelectedExam(exam);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setExams((prev) => prev.filter((e) => e.id !== selectedExam.id));
    setIsDeleteModalOpen(false);
    setSelectedExam(null);
  };

  const handleSaveExam = (updatedExam) => {
    // Update existing exam
    const formattedDate = updatedExam.date;
    
    setExams((prev) =>
      prev.map((e) => (e.id === updatedExam.id ? { ...e, ...updatedExam } : e))
    );
    setIsEditMode(false);
    setSelectedExam(null);
  };

  if (isViewMode && selectedExam) {
    return (
      <ViewExam
        exam={selectedExam}
        onBack={() => {
            setIsViewMode(false);
            setSelectedExam(null);
        }}
      />
    );
  }

  if (isEditMode && selectedExam) {
    return (
      <CreateExam
        initialData={selectedExam}
        onSave={handleSaveExam}
        onBack={() => {
            setIsEditMode(false);
            setSelectedExam(null);
        }}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/teacher-home")}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-[#0F6B75]" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F6B75]">
            All Exams
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="pr-2 flex bg-gray-200 rounded-lg">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="text-gray-700 text-sm font-medium focus:ring-[#0F6B75] focus:border-[#0F6B75] block p-2.5 outline-none"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="pr-2 flex bg-gray-200 rounded-lg">
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="text-gray-700 text-sm font-medium rounded-lg focus:ring-[#0F6B75] focus:border-[#0F6B75] block p-2.5 outline-none"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="pr-2 flex bg-gray-200 rounded-lg">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-gray-700 text-sm font-medium rounded-lg focus:ring-[#0F6B75] focus:border-[#0F6B75] block p-2.5 outline-none"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
        <ManageExamTable
          exams={filteredExams}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Exam"
        message={`Are you sure you want to delete "${selectedExam?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        isDanger={true}
      />
    </>
  );
};

export default TeacherExam;
