import { FileCheck } from "lucide-react";

const TableExam = ({ exams }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8 flex flex-col h-[400px]">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-[#012f36] flex items-center gap-2">
          <FileCheck size={20} className="text-[#0F6B75]" />
          Exams Detail
        </h3>
      </div>
      <div className="overflow-x-auto overflow-y-auto flex-1 hide-scrollbar">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-white sticky top-0 z-10 shadow-sm">
            <tr className="text-xs uppercase tracking-wider text-gray-500 font-bold">
              <th className="px-6 py-4">Exam Title</th>
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Semester</th>
              <th className="px-6 py-4">Teacher</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Students</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {exams.map(exam => (
              <tr key={exam.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 font-bold text-[#012f36]">{exam.title}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{exam.className}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{exam.semester}</td>
                <td className="px-6 py-4 text-gray-600">{exam.teacher}</td>
                <td className="px-6 py-4 text-gray-500">{exam.type}</td>
                <td className="px-6 py-4 text-gray-500">{exam.date}</td>
                <td className="px-6 py-4 text-center text-gray-700 font-medium">{exam.students}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[0.7rem] font-extrabold uppercase tracking-wider border ${
                    exam.status === 'Completed' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : exam.status === 'Schedule'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {exam.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableExam;
