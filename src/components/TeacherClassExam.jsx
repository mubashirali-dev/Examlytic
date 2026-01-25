import { useState } from "react";
import { PlusCircle, ChevronDown } from "lucide-react";
import ManageExamTable from "./ManageExamTable";
import CreateExam from "./CreateExam";
import ConfirmationModal from "./ConfirmationModal";
import ViewExam from "./ViewExam";
import DropDownMenu from "./DropDownMenu";

const TeacherClassExam = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [viewingExam, setViewingExam] = useState(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  // Filters & Sorting
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("Date");

  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Calculus Midterm",
      subject: "Mathematics",
      questions: 2,
      status: "Published",
      date: "Nov 26, 2025, 10:00 AM",
      duration: 60,
      passingMarks: 40,
      randomize: true,
      questionsList: [
        {
          id: 101,
          type: "mcq",
          text: "What is the derivative of x^2?",
          marks: 5,
          options: ["x", "2x", "2", "x^2"],
          correctOption: 1,
        },
        {
          id: 102,
          type: "mcq",
          text: "Which of the following is an irrational number?",
          marks: 5,
          options: ["5", "3.14", "Pi (π)", "0"],
          correctOption: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Physics Quiz 1",
      subject: "Physics",
      questions: 1,
      status: "Scheduled",
      date: "Dec 01, 2025, 09:00 AM",
      duration: 45,
      passingMarks: 20,
      randomize: false,
      questionsList: [
        {
          id: 201,
          type: "subjective",
          text: "Define Newton's Second Law of Motion.",
          marks: 10,
          options: [],
        },
      ],
    },
    {
      id: 3,
      title: "Chem Lab Safety",
      subject: "Chemistry",
      questions: 0,
      status: "Published",
      date: "Oct 15, 2025, 11:00 AM",
      duration: 30,
      passingMarks: 15,
      questionsList: [],
    },
    {
      id: 4,
      title: "English Literature",
      subject: "English",
      questions: 1,
      status: "Draft",
      date: "Dec 10, 2025, 10:00 AM",
      duration: 90,
      passingMarks: 50,
      questionsList: [
        {
          id: 401,
          type: "mcq",
          text: "Who wrote 'Hamlet'?",
          marks: 2,
          options: [
            "Charles Dickens",
            "William Shakespeare",
            "Jane Austen",
            "Mark Twain",
          ],
          correctOption: 1,
        },
      ],
    },
    {
      id: 5,
      title: "History Finals",
      subject: "History",
      questions: 0,
      status: "Completed",
      date: "Sep 20, 2025, 02:00 PM",
      questionsList: [],
    },
  ]);

  const handleSaveExam = (newExam) => {
    const formatDateTime = (dateStr, timeStr) => {
      // If date already formatted (from edit without change), return as it is
      if (!dateStr || !timeStr) return "TBD";
      if (dateStr.includes(",")) return dateStr; // Simple check if already formatted

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const [year, m, d] = dateStr.split("-");
      const monthName = months[parseInt(m) - 1] || "";

      let [hours, minutes] = timeStr.split(":");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;

      return `${monthName} ${parseInt(d)}, ${year}, ${hours}:${minutes} ${ampm}`;
    };

    const formattedExam = {
      ...newExam,
      id: editingExam ? editingExam.id : Date.now(),
      title: newExam.title || "Untitled Exam",
      questions: newExam.questions.length,
      status: newExam.status,
      date:
        newExam.date && newExam.date.includes(",")
          ? newExam.date
          : formatDateTime(newExam.date, newExam.startTime),
    };

    if (editingExam) {
      setExams(
        exams.map((ex) => (ex.id === editingExam.id ? formattedExam : ex)),
      );
    } else {
      setExams([formattedExam, ...exams]);
    }

    setIsCreating(false);
    setEditingExam(null);
  };

  const handleEdit = (exam) => {
    // Parse the date string "Nov 26, 2025, 10:00 AM" back to form values
    let parsedDate = "";
    let parsedStartTime = "";
    let parsedEndTime = "";

    try {
      if (exam.date && exam.date !== "TBD") {
        const parts = exam.date.split(", "); // ["Nov 26", "2025", "10:00 AM"]
        if (parts.length >= 3) {
          const [monthDay, year] = [parts[0], parts[1]];
          const [monthStr, day] = monthDay.split(" ");
          const timeStr = parts[2];

          const months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
          };

          const month = months[monthStr];
          const formattedDay = parseInt(day).toString().padStart(2, "0");
          parsedDate = `${year}-${month}-${formattedDay}`;

          // Parse Start Time
          const [time, modifier] = timeStr.split(" ");
          let [hours, minutes] = time.split(":");

          if (hours === "12") {
            hours = "00";
          }
          if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12;
          }
          parsedStartTime = `${hours.toString().padStart(2, "0")}:${minutes}`;

          // Calculate End Time based on Duration
          if (exam.duration) {
            const startDate = new Date(`2000-01-01T${parsedStartTime}:00`);
            const endDate = new Date(
              startDate.getTime() + exam.duration * 60000,
            );
            const endHours = endDate.getHours().toString().padStart(2, "0");
            const endMinutes = endDate.getMinutes().toString().padStart(2, "0");
            parsedEndTime = `${endHours}:${endMinutes}`;
          }
        }
      }
    } catch (e) {
      console.error("Error parsing date:", e);
    }

    const initialData = {
      ...exam,
      questions: exam.questionsList || [],
      totalMarks: exam.questionsList
        ? exam.questionsList.reduce((sum, q) => sum + parseInt(q.marks), 0)
        : 0,
      date: parsedDate,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
    };
    setEditingExam(initialData);
    setIsCreating(true);
  };

  const handleDelete = (exam) => {
    setExamToDelete(exam);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setExams(exams.filter((e) => e.id !== examToDelete.id));
    setIsDeleteModalOpen(false);
    setExamToDelete(null);
  };

  const handleView = (exam) => {
    setViewingExam(exam);
  };

  // Filter & Sort Logic
  const filteredAndSortedExams = [...exams]
    .filter(
      (exam) => filterStatus === "All Statuses" || exam.status === filterStatus,
    )
    .sort((a, b) => {
      if (sortBy === "A-Z") return a.title.localeCompare(b.title);
      if (sortBy === "Z-A") return b.title.localeCompare(a.title);
      if (sortBy === "Date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Newest first
      }
      return 0;
    });

  const statuses = ["All Statuses", ...new Set(exams.map((e) => e.status))];

  if (isCreating) {
    return (
      <CreateExam
        onBack={() => {
          setIsCreating(false);
          setEditingExam(null);
        }}
        onSave={handleSaveExam}
        initialData={editingExam}
      />
    );
  }

  if (viewingExam) {
    return <ViewExam exam={viewingExam} onBack={() => setViewingExam(null)} />;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-[#0F6B75]">Manage Exams</h2>
        <button
          onClick={() => {
            setEditingExam(null);
            setIsCreating(true);
          }}
          className="bg-[#0F6B75] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#0c565e] transition-colors cursor-pointer"
        >
          <PlusCircle size={20} />
          Create New Exam
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {/* Filters */}
        <div className="p-4 flex flex-wrap gap-4 border-b border-gray-200">
          <DropDownMenu
            options={["Date", "A-Z", "Z-A"]}
            value={sortBy}
            onChange={setSortBy}
            prefix="Sort by:"
          />

          <DropDownMenu
            options={statuses}
            value={filterStatus}
            onChange={setFilterStatus}
          />
        </div>

        <ManageExamTable
          exams={filteredAndSortedExams}
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
        message={`Are you sure you want to delete "${examToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        isDanger={true}
      />
    </div>
  );
};

export default TeacherClassExam;
