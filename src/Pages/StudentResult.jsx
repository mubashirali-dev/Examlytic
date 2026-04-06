import { useState, useEffect, useMemo } from "react";
import { Award, Clock, CheckCircle } from "lucide-react";
import axios from "axios";
import DropDownMenu from "../components/DropDownMenu";

const getGrade = (obtained, total) => {
  if (!total) return "N/A";
  const pct = (obtained / total) * 100;
  if (pct >= 90) return "A+";
  if (pct >= 85) return "A";
  if (pct >= 80) return "A-";
  if (pct >= 75) return "B+";
  if (pct >= 70) return "B";
  if (pct >= 65) return "B-";
  if (pct >= 60) return "C+";
  if (pct >= 55) return "C";
  if (pct >= 50) return "D";
  return "F";
};

const gradeColor = (grade) => {
  if (grade.startsWith("A")) return "bg-green-100 text-green-700";
  if (grade.startsWith("B")) return "bg-blue-100 text-blue-700";
  if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-700";
  if (grade.startsWith("D")) return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
};

const getTimeTaken = (startedAt, submittedAt) => {
  if (!startedAt || !submittedAt) return null;
  const diff = new Date(submittedAt) - new Date(startedAt);
  const mins = Math.floor(diff / 60000);
  return mins > 0 ? `${mins}m` : "<1m";
};

const StudentResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState("All Classes");

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userId = currentUser.id;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/results/student/${userId}`);
        setResults(data.results || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [userId]);

  /* ---------- Dynamic class options ---------- */
  const classOptions = useMemo(() => {
    const unique = [
      ...new Set(
        results
          .map((r) => r.examId?.classId?.className)
          .filter(Boolean)
      ),
    ];
    return ["All Classes", ...unique];
  }, [results]);

  /* ---------- Filtered results ---------- */
  const filteredResults = useMemo(() => {
    if (selectedClass === "All Classes") return results;
    return results.filter(
      (r) => r.examId?.classId?.className === selectedClass
    );
  }, [results, selectedClass]);

  /* ---------- Summary stats ---------- */
  const stats = useMemo(() => {
    if (!results.length)
      return { avgPct: 0, completed: 0, avgTime: null };

    const avgPct =
      results.reduce(
        (sum, r) => sum + (r.obtainedMarks / r.totalMarks) * 100,
        0
      ) / results.length;

    // avg time from attempt startedAt -> submittedAt
    const timings = results
      .map((r) => {
        const start = r.attemptId?.startedAt;
        const end = r.attemptId?.submittedAt;
        if (!start || !end) return null;
        return (new Date(end) - new Date(start)) / 60000;
      })
      .filter((t) => t !== null && t > 0);

    const avgTime =
      timings.length
        ? Math.round(timings.reduce((a, b) => a + b, 0) / timings.length)
        : null;

    return {
      avgPct: avgPct.toFixed(1),
      completed: results.length,
      avgTime,
    };
  }, [results]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-[#0F6B75] font-medium">
        Loading results...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        {error}
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#0F6B75]">My Results</h1>
        <DropDownMenu
          options={classOptions}
          value={selectedClass}
          onChange={setSelectedClass}
          prefix="Filter by:"
        />
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Avg Score */}
        <div className="bg-linear-to-br from-[#0F6B75] to-[#0c565e] p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <Award size={24} />
            <span className="font-medium">Average Score</span>
          </div>
          <h2 className="text-4xl font-bold">{stats.avgPct}%</h2>
          <p className="text-sm opacity-75 mt-2">
            {stats.avgPct >= 85
              ? "Excellent performance"
              : stats.avgPct >= 70
              ? "Good performance"
              : stats.avgPct >= 50
              ? "Needs improvement"
              : "Keep practicing"}
          </p>
        </div>

        {/* Exams Completed */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <CheckCircle size={24} className="text-green-500" />
            <span className="font-medium">Exams Completed</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{stats.completed}</h2>
          <p className="text-sm text-gray-400 mt-2">
            {results.filter((r) => r.isPassed).length} passed ·{" "}
            {results.filter((r) => !r.isPassed).length} failed
          </p>
        </div>

        {/* Avg Time */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Clock size={24} className="text-blue-500" />
            <span className="font-medium">Avg Time / Exam</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {stats.avgTime ? `${stats.avgTime}m` : "—"}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {stats.avgTime ? "Average completion time" : "No timing data yet"}
          </p>
        </div>
      </div>

      {/* Results List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-800 p-6 border-b border-gray-200">
          Recent Exams
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""})
          </span>
        </h3>

        {filteredResults.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No results found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredResults.map((res) => {
              const pct = Math.round((res.obtainedMarks / res.totalMarks) * 100);
              const grade = getGrade(res.obtainedMarks, res.totalMarks);
              const timeTaken = getTimeTaken(
                res.attemptId?.startedAt,
                res.attemptId?.submittedAt
              );
              const date = res.submittedAt
                ? new Date(res.submittedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—";

              return (
                <div
                  key={res._id}
                  className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Left — exam info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {res.examId?.title || "—"}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {res.examId?.classId?.className || "—"} ·{" "}
                      {res.examId?.classId?.courseTitle || ""}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{date}</p>
                  </div>

                  {/* Right — stats */}
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end flex-wrap">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                        Score
                      </p>
                      <p className="font-bold text-xl text-gray-800">
                        {res.obtainedMarks}/{res.totalMarks}
                      </p>
                      <p className="text-xs text-gray-400">{pct}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                        Grade
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-bold text-sm ${gradeColor(grade)}`}
                      >
                        {grade}
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                        Status
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-bold text-sm ${
                          res.isPassed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {res.isPassed ? "Passed" : "Failed"}
                      </span>
                    </div>

                    {timeTaken && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                          Time
                        </p>
                        <p className="font-bold text-gray-800">{timeTaken}</p>
                      </div>
                    )}

                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                        Grading
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-bold text-sm ${
                          res.gradingStatus === "graded"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {res.gradingStatus === "graded" ? "Graded" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default StudentResult;