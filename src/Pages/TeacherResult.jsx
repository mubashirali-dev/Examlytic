import React, { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import DropDownMenu from "../components/DropDownMenu";

const TeacherResult = () => {
  const results = [
    {
      id: 1,
      name: "Ali Khan",
      rollNo: "BSCS-20-001",
      class: "BSCS 7A",
      exam: "Calculus Midterm",
      score: "22/25",
      grade: "A",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      rollNo: "BSCS-21-015",
      class: "BSCS 7A",
      exam: "Calculus Midterm",
      score: "18/25",
      grade: "B",
    },
    {
      id: 3,
      name: "Dawood Altaf",
      rollNo: "BSCS-20-042",
      class: "BSCS 7B",
      exam: "Calculus Midterm",
      score: "25/25",
      grade: "A+",
    },
    {
      id: 4,
      name: "Faiza Rehman",
      rollNo: "BSCS-22-033",
      class: "BSCS 7B",
      exam: "Physics Quiz",
      score: "08/10",
      grade: "B+",
    },
    {
      id: 5,
      name: "Jamal Ajmed",
      rollNo: "BSCS-21-078",
      class: "BSSE 2A",
      exam: "Physics Quiz",
      score: "9/10",
      grade: "A",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedExam, setSelectedExam] = useState("All Exams");

  const classes = ["All Classes", ...new Set(results.map((r) => r.class))];
  const exams = ["All Exams", ...new Set(results.map((r) => r.exam))];

  const filteredResults = results.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      selectedClass === "All Classes" || res.class === selectedClass;
    const matchesExam =
      selectedExam === "All Exams" || res.exam === selectedExam;
    return matchesSearch && matchesClass && matchesExam;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0F6B75]">
          Results
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by student name or roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/20 focus:border-[#0F6B75]"
            />
          </div>
          <div className="flex gap-3">
            <DropDownMenu
              options={classes}
              value={selectedClass}
              onChange={setSelectedClass}
            />
            <DropDownMenu
              options={exams}
              value={selectedExam}
              onChange={setSelectedExam}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Exam</th>
                <th className="px-6 py-4 text-center">Score</th>
                <th className="px-6 py-4 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResults.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {res.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{res.rollNo}</td>
                  <td className="px-6 py-4 text-gray-500">{res.class}</td>
                  <td className="px-6 py-4 text-gray-600">{res.exam}</td>
                  <td className="px-6 py-4 text-center font-bold text-[#0F6B75]">
                    {res.score}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        res.grade.startsWith("A")
                          ? "bg-green-100 text-green-700"
                          : res.grade.startsWith("B")
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {res.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TeacherResult;
