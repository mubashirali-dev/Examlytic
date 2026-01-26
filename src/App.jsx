import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainScreen from "./Pages/mainScreen.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import TeacherSignUp from "./Pages/TeacherSignUp.jsx";
import StudentSignUp from "./Pages/StudentSignUp.jsx";
import TeacherScreen from "./Pages/TeacherScreen.jsx";
import StudentScreen from "./Pages/StudentScreen.jsx";
import TeacherHome from "./Pages/TeacherHome.jsx";
import StudentHome from "./Pages/StudentHome.jsx";
import TeacherExam from "./Pages/TeacherExam.jsx";
import TeacherReport from "./Pages/TeacherReport.jsx";
import TeacherResult from "./Pages/TeacherResult.jsx";
import StudentResult from "./Pages/StudentResult.jsx";
import Admin from "./Admin.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Signup Routes */}
        <Route path="/signup-teacher" element={<TeacherSignUp />} />
        <Route path="/signup-student" element={<StudentSignUp />} />
        {/* Redirect /signup to /signup-teacher by default or as requested */}
        <Route path="/signup" element={<Navigate to="/signup-teacher" replace />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* Teacher Routes Layout */}
        <Route element={<TeacherScreen />}>
          <Route path="/teacher-home" element={<TeacherHome />} />
          <Route path="/teacher-exams" element={<TeacherExam />} />
          <Route path="/teacher-reports" element={<TeacherReport />} />
          <Route path="/teacher-results" element={<TeacherResult />} />
        </Route>

        {/* Student Routes Layout */}
        <Route element={<StudentScreen />}>
          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/student-results" element={<StudentResult />} />
        </Route>
      </Routes>
    </Router>
  );
}
