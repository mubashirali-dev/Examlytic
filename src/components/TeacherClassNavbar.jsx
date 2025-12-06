const TeacherClassNavbar = ({ activeTab, setActiveTab }) => {

  const tabs = ['Overview', 'Students', 'Exams', 'Assignments', 'Material'];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex flex-wrap gap-x-8 gap-y-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === tab
                ? 'border-[#0F6B75] text-[#0F6B75]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TeacherClassNavbar;
