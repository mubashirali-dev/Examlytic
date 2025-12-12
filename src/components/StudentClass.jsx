import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import StudentClassExam from './StudentClassExam';
import StudentClassMaterial from './StudentClassMaterial';

const StudentClass = ({ classData, onBack }) => {
  const [activeTab, setActiveTab] = useState('Exams');
  const tabs = ['Exams', 'Material'];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-10 md:pt-6 relative border border-gray-200 mb-8 min-h-[80vh]">
      {/* Class Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-500 hover:text-[#0F6B75] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0F6B75]">
              Class: {classData.title}
            </h1>
            <p className="text-[#0F6B75] text-sm font-medium mt-1">
              {classData.section}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab
                    ? "border-[#0F6B75] text-[#0F6B75]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === 'Exams' && <StudentClassExam />}
        {activeTab === 'Material' && <StudentClassMaterial />}
      </div>
    </div>
  );
};

export default StudentClass;
