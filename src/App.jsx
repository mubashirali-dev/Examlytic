import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./Pages/mainScreen.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import TeacherScreen from "./Pages/TeacherScreen.jsx";
import StudentScreen from "./Pages/StudentScreen.jsx";
import TeacherHome from "./Pages/TeacherHome.jsx";
import StudentHome from "./Pages/StudentHome.jsx";
import TeacherExam from "./Pages/TeacherExam.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Teacher Routes Layout */}
        <Route element={<TeacherScreen />}>
          <Route path="/teacher-home" element={<TeacherHome />} />
          <Route path="/teacher-exams" element={<TeacherExam />} />
        </Route>

        {/* Student Routes Layout */}
        <Route element={<StudentScreen />}>
          <Route path="/student-home" element={<StudentHome />} />
        </Route>
      </Routes>
    </Router>
  );
}
