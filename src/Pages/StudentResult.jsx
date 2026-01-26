import { useState } from "react";
import { Award, Clock, CheckCircle } from "lucide-react";
import DropDownMenu from "../components/DropDownMenu";

const StudentResult = () => {
  // Mock Data
  const results = [
    {
      id: 1,
      title: "Calculus Midterm",
      date: "Oct 24, 2024",
      score: "22/25",
      percentage: "88%",
      grade: "A",
      class: "Calculus I",
    },
    {
      id: 2,
      title: "Physics Quiz 1",
      date: "Sep 15, 2024",
      score: "8/10",
      percentage: "80%",
      grade: "B+",
      class: "Physics 101",
    },
    {
        id: 3,
        title: "Programming Fundamentals Final",
        date: "Dec 10, 2024",
        score: "95/100",
        percentage: "95%",
        grade: "A+",
        class: "CS 101",
      },
  ];

  const [selectedClass, setSelectedClass] = useState("All Classes");

  // Get unique classes for dropdown
  const classes = ["All Classes", ...new Set(results.map((r) => r.class))];

  // Filter results based on selection
  const filteredResults =
    selectedClass === "All Classes"
      ? results
      : results.filter((r) => r.class === selectedClass);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#0F6B75]">My Results</h1>
        <DropDownMenu
          options={classes}
          value={selectedClass}
          onChange={setSelectedClass}
          prefix="Filter by:"
        />
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-linear-to-br from-[#0F6B75] to-[#0c565e] p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <Award size={24} />
            <span className="font-medium">Average Score</span>
          </div>
          <h2 className="text-4xl font-bold">84%</h2>
          <p className="text-sm opacity-75 mt-2">Top 15% of class</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <CheckCircle size={24} className="text-green-500" />
            <span className="font-medium">Exams Completed</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">12</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Clock size={24} className="text-blue-500" />
            <span className="font-medium">Avg Time/Exam</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">45m</h2>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-800 p-6 border-b border-gray-200">
          Recent Exams
        </h3>
        <div className="divide-y divide-gray-100">
          {filteredResults.map((res) => (
            <div
              key={res.id}
              className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg">{res.title}</h4>
                <p className="text-gray-500 text-sm">{res.date}</p>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    Score
                  </p>
                  <p className="font-bold text-xl text-gray-800">{res.score}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    Grade
                  </p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                    {res.grade}
                  </span>
                </div>
                <button className="px-4 py-2 border border-[#0F6B75] text-[#0F6B75] rounded-lg font-medium hover:bg-teal-50 transition-colors">
                  View Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentResult;
