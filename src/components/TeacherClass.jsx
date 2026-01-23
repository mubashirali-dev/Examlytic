import { useState } from "react";
import { Pencil } from "lucide-react";
import TeacherClassNavbar from "./TeacherClassNavbar";
import TeacherClassOverview from "./TeacherClassOverview";
import TeacherClassStudents from "./TeacherClassStudents";
import TeacherClassExam from "./TeacherClassExam";
import EditClass from "./EditClass";
import Material from "./Material";

const TeacherClass = ({ classData, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-10 md:pt-6 relative border border-gray-200 mb-8 min-h-[80vh]">
      {/* Class Header */}
      <div className="mb-6 flex items-start gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#0F6B75]">
              Class: {classData?.title}
            </h1>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-gray-400 hover:text-[#0F6B75] transition-colors p-1 rounded-full hover:bg-teal-50"
            >
              <Pencil size={18} />
            </button>
          </div>
          <p className="text-[#0F6B75] text-sm font-medium mt-1">
            {classData?.section}
          </p>
        </div>
      </div>

      {/* Navbar */}
      <TeacherClassNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === "Overview" && (
          <TeacherClassOverview classData={classData} />
        )}
        {activeTab === "Students" && <TeacherClassStudents />}
        {activeTab === "Exams" && <TeacherClassExam />}
        {activeTab === "Material" && <Material role="Teacher" />}
      </div>

      {/* Edit Class Modal */}
      <EditClass
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        classData={classData}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default TeacherClass;
