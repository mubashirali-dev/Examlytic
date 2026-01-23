import React, { useState } from "react";
import { 
  BarChart2, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Download, 
  Mail,
  ChevronDown
} from "lucide-react";

const TeacherReport = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  // Mock Data
  const stats = [
    { 
      title: "Avg Class Score", 
      value: "78%", 
      icon: TrendingUp, 
      color: "text-green-600", 
      bg: "bg-green-100" },
    { 
      title: "Pass Rate", 
      value: "92%", 
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-100" },
    { 
      title: "Flagged Cases", 
      value: "3", 
      icon: AlertTriangle, 
      color: "text-red-600", 
      bg: "bg-red-100" },
  ];

  const cheatingLogs = [
    { 
      id: 1, 
      student: "Ali Khan", 
      exam: "Calculus Midterm", 
      time: "10:45 AM", 
      reason: "Tab Switching detected", 
      status: "Pending" 
    },
    { 
      id: 2, 
      student: "Sara Ahmed", 
      exam: "Physics Quiz", 
      time: "09:12 AM", 
      reason: "Face not detected", 
      status: "Reviewed" 
    },
    { 
      id: 3, 
      student: "John Doe", 
      exam: "Calculus Midterm", 
      time: "11:00 AM", 
      reason: "Multiple faces detected", 
      status: "Pending" 
    },
  ];

  const handleEmailReport = (student) => {
    alert(`Report emailed to ${student}'s parents successfully.`);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F6B75]">Reports</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200 flex overflow-x-auto ">
          {["Overview", "Cheating Logs", "Student Performance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer outline-none ${
                activeTab === tab 
                  ? "text-[#0F6B75] border-b-2 border-[#0F6B75] bg-teal-50/50" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "Overview" && (
            <div className="space-y-8">
              {/* Chart Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Trend</h3>
                <div className="h-64 flex items-end justify-between gap-2 md:gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                   {[65, 72, 68, 85, 78, 82, 90].map((height, i) => (
                     <div key={i} className="w-full flex flex-col items-center gap-2 group">
                        <div 
                          className="w-full max-w-[40px] bg-[#0F6B75] rounded-t-md transition-all duration-500 group-hover:bg-[#0c565e] relative"
                          style={{ height: `${height}%` }}
                        >
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {height}%
                            </span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Exam {i+1}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* Cheating Logs */}
          {activeTab === "Cheating Logs" && (
            <div>
               <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Student Name</th>
                      <th className="px-6 py-4">Exam</th>
                      <th className="px-6 py-4">Flagged Reason</th>
                      <th className="px-6 py-4">Time</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cheatingLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{log.student}</td>
                        <td className="px-6 py-4 text-gray-600">{log.exam}</td>
                        <td className="px-6 py-4 text-red-600 font-medium">{log.reason}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{log.time}</td>
                        <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                log.status === 'Pending' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                                {log.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => handleEmailReport(log.student)}
                            className="bg-white border border-gray-200 text-gray-600 hover:text-[#0F6B75] hover:border-[#0F6B75] px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer"
                          >
                            <Mail size={16} />
                            Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Student Performance */}
          {activeTab === "Student Performance" && (
             <div className="text-center py-10 text-gray-500">
                <p>Select a class to view detailed student metrics.</p>
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherReport;
