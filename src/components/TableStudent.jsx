import { Users } from "lucide-react";

const TableStudent = ({ students }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[400px]">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-[#012f36] flex items-center gap-2">
          <Users size={20} className="text-[#0F6B75]" />
          Students Detail
        </h3>
      </div>
      <div className="overflow-x-auto overflow-y-auto flex-1 hide-scrollbar">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-white sticky top-0 z-10 shadow-sm">
            <tr className="text-xs uppercase tracking-wider text-gray-500 font-bold">
              <th className="px-6 py-3">Name & Email</th>
              <th className="px-6 py-3">Roll No</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Semester</th>
              <th className="px-6 py-3">Teacher</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map(student => (
              <tr key={student.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-3">
                  <div className="font-bold text-gray-800">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-3 text-gray-600 font-medium">{student.rollNo}</td>
                <td className="px-6 py-3 text-gray-600">{student.department}</td>
                <td className="px-6 py-3 text-gray-600">{student.semester}</td>
                <td className="px-6 py-3 text-gray-600">{student.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableStudent;
