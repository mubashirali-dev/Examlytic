import { useState, useEffect } from "react";
import { UserCheck, ChevronLeft, ChevronRight } from "lucide-react";

const TableTeacher = ({ teachers, title = "Teachers Detail", itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page if teachers line-up changes (e.g. via search)
  useEffect(() => {
    setCurrentPage(1);
  }, [teachers]);

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, teachers.length);
  const currentTeachers = teachers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-[#012f36] flex items-center gap-2">
          <UserCheck size={20} className="text-[#0F6B75]" />
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto overflow-y-auto flex-1 hide-scrollbar">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-white sticky top-0 z-10 shadow-sm">
            <tr className="text-xs uppercase tracking-wider text-gray-500 font-bold">
              <th className="px-6 py-3">Name & Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3 text-center">Phone</th>
              <th className="px-6 py-3 text-center">Qualification</th>
              <th className="px-6 py-3 text-center">Experience</th>
              <th className="px-6 py-3 text-center">Classes</th>
              <th className="px-6 py-3 text-center">Students</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentTeachers.length > 0 ? (
              currentTeachers.map(teacher => (
                <tr key={teacher.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-3">
                  <div className="font-bold text-gray-800">{teacher.name}</div>
                  <div className="text-sm text-gray-500">{teacher.email}</div>
                </td>
                <td className="px-6 py-3 text-gray-600 font-medium">{teacher.department}</td>
                <td className="px-6 py-3 text-center text-gray-700">{teacher.phone}</td>
                <td className="px-6 py-3 text-center text-gray-700">{teacher.qualification}</td>
                <td className="px-6 py-3 text-center text-gray-700">{teacher.experience}</td>
                <td className="px-6 py-3 text-center text-gray-700">{teacher.classes}</td>
                <td className="px-6 py-3 text-center text-gray-700">{teacher.students}</td>
                <td className="px-6 py-3 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border ${
                    teacher.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 
                    teacher.status === 'Suspended' ? 'bg-red-50 text-red-700 border-red-200' : 
                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }`}>
                    {teacher.status}
                  </span>
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      {teachers.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{endIndex}</span> of <span className="font-medium text-gray-900">{teachers.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="text-sm font-medium text-gray-700 px-2">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableTeacher;
