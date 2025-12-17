import { useState } from 'react';
import TeacherClassNavbar from './TeacherClassNavbar';
import TeacherClassOverview from './TeacherClassOverview';
import TeacherClassStudents from './TeacherClassStudents';
import TeacherClassExam from './TeacherClassExam';

const TeacherClass = ({ classData }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-10 md:pt-6 relative border border-gray-200 mb-8 min-h-[80vh]">
      {/* Class Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F6B75]">Class: {classData?.title || 'Advanced Calculus'}</h1>
        <p className="text-[#0F6B75] text-sm font-medium mt-1">{classData?.section || 'BSCS 7A MOR'}</p>
      </div>

      {/* Navbar */}
      <TeacherClassNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === 'Overview' && <TeacherClassOverview />}
        {activeTab === 'Students' && <TeacherClassStudents />}
        {activeTab === 'Exams' && <TeacherClassExam />}
        {activeTab === 'Assignments' && <div>Assignments Content Placeholder</div>}
        {activeTab === 'Material' && <div>Material Content Placeholder</div>}
      </div>
    </div>
  );
};

export default TeacherClass;
