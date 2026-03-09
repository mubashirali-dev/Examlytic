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
import StudentAdmin from "./components/StudentAdmin.jsx";
import ClassManager from "./components/ClassManager.jsx";
import SuperAdminScreen from "./Pages/SuperAdminScreen.jsx";
import SuperAdminDashboard from "./Pages/SuperAdminDashboard.jsx";
import SuperAdminAdmins from "./Pages/SuperAdmin-Admins.jsx";
import SuperAdminCreateAdmin from "./Pages/SuperAdmin-CreateAdmin.jsx";
import SuperAdminSetting from "./Pages/SuperAdminSetting.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";

export default function App() {
  return (
<Router>
  <Routes>

    <Route path="/" element={<MainScreen />} />
    <Route path="/login" element={<LoginPage />} />

    {/* Signup */}
    <Route path="/signup-teacher" element={<TeacherSignUp />} />
    <Route path="/signup-student" element={<StudentSignUp />} />

    {/* Admin */}
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin-classes" element={<ClassManager />} />
    </Route>

    {/* Super Admin */}
    <Route element={<ProtectedRoute allowedRoles={["super-admin"]} />}>
      <Route path="/superadmin" element={<SuperAdminScreen />}>
        <Route index element={<SuperAdminDashboard />} />
        <Route path="admins" element={<SuperAdminAdmins />} />
        <Route path="create-admin" element={<SuperAdminCreateAdmin />} />
        <Route path="settings" element={<SuperAdminSetting />} />
      </Route>
    </Route>

    {/* Teacher */}
    <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
      <Route element={<TeacherScreen />}>
        <Route path="/teacher-home" element={<TeacherHome />} />
        <Route path="/teacher-exams" element={<TeacherExam />} />
        <Route path="/teacher-reports" element={<TeacherReport />} />
        <Route path="/inviteStudent" element={<StudentAdmin />} />
        <Route path="/teacher-results" element={<TeacherResult />} />
      </Route>
    </Route>

    {/* Student */}
    <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
      <Route element={<StudentScreen />}>
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/student-results" element={<StudentResult />} />
      </Route>
    </Route>

  </Routes>
</Router>
  );
}
