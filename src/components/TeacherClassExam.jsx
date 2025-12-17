import React from 'react';
import { PlusCircle, ChevronDown } from 'lucide-react';
import ManageExamTable from './ManageExamTable';

const TeacherClassExam = () => {
  const exams = [
    {
      id: 1,
      title: 'Quiz: 1 Chapter: 1',
      questions: 20,
      status: 'Published',
      date: 'Nov 26, 2025, 10:00 AM',
    },
    {
      id: 2,
      title: 'Quiz: 1 Chapter: 1',
      questions: 20,
      status: 'Scheduled',
      date: 'Nov 26, 2025, 10:00 AM',
    },
    {
      id: 3,
      title: 'Quiz: 1 Chapter: 1',
      questions: 20,
      status: 'Published',
      date: 'Nov 26, 2025, 10:00 AM',
    },
    {
      id: 4,
      title: 'Quiz: 1 Chapter: 1',
      questions: 20,
      status: 'Draft',
      date: 'Nov 26, 2025, 10:00 AM',
    },
    {
      id: 5,
      title: 'Quiz: 1 Chapter: 1',
      questions: 20,
      status: 'Completed',
      date: 'Nov 26, 2025, 10:00 AM',
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-[#0F6B75]">Manage Exams</h2>
        <button className="bg-[#0F6B75] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#0c565e] transition-colors">
          <PlusCircle size={20} />
          Create New Exam
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Filters */}
        <div className="p-4 flex flex-wrap gap-4 border-b border-gray-200">
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-200">
            All Subjects <ChevronDown size={16} />
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-200">
            All Classes <ChevronDown size={16} />
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-200">
            All Statuses <ChevronDown size={16} />
          </button>
        </div>

        <ManageExamTable exams={exams} />
      </div>
    </div>
  );
};

export default TeacherClassExam;
