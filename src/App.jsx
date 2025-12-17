import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./Pages/mainScreen.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import TeacherHome from "./Pages/TeacherHome.jsx";
import StudentHome from "./Pages/StudentHome.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/teacher-home" element={<TeacherHome />} />
        <Route path="/student-home" element={<StudentHome />} />
      </Routes>
    </Router>
  );
}
