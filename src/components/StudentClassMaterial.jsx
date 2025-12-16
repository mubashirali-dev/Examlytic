import { FileText, Video, Link as LinkIcon, Download } from "lucide-react";

const StudentClassMaterial = () => {
  // Mock Data for materials
  const materials = [
    {
      id: 1,
      title: "Lecture 1: Introduction",
      type: "pdf",
      date: "Oct 10, 2025",
    },
    {
      id: 2,
      title: "Reference Video: Chapter 1",
      type: "video",
      date: "Oct 12, 2025",
    },
    { id: 3, title: "Course Syllabus", type: "doc", date: "Oct 01, 2025" },
    {
      id: 4,
      title: "Extra Reading Resources",
      type: "link",
      date: "Oct 15, 2025",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-500" size={24} />;
      case "video":
        return <Video className="text-blue-500" size={24} />;
      case "link":
        return <LinkIcon className="text-green-500" size={24} />;
      default:
        return <FileText className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#0F6B75] mb-6">Class Materials</h2>
      <div className="grid grid-cols-1 gap-4">
        {materials.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                {getIcon(item.type)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">Posted on {item.date}</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-[#0F6B75] hover:bg-teal-50 rounded-lg transition-colors">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentClassMaterial;
