import React, { useState } from "react";
import { FileText, Video, Link as LinkIcon, Download, Plus, Pencil, Trash2, X } from "lucide-react";

// Simple Modal for Adding/Editing Material
const MaterialModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || { title: "", type: "pdf", date: new Date().toLocaleDateString() }
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0F6B75]">
            {initialData ? "Edit Material" : "Add Material"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/20 focus:border-[#0F6B75]"
              placeholder="e.g., Lecture 1 Slides"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F6B75]/20 focus:border-[#0F6B75]"
            >
              <option value="pdf">PDF Document</option>
              <option value="video">Video</option>
              <option value="doc">Word Document</option>
              <option value="link">External Link</option>
            </select>
          </div>
          <button
            onClick={() => onSave(formData)}
            className="w-full bg-[#0F6B75] text-white py-2 rounded-lg font-bold hover:bg-[#0c565e] transition-colors mt-2"
          >
            Save Material
          </button>
        </div>
      </div>
    </div>
  );
};

const Material = ({ role = "Student" }) => {
  // Mock Data for materials
  const [materials, setMaterials] = useState([
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
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

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

  const handleSave = (data) => {
    if (editingMaterial) {
      setMaterials(materials.map(m => m.id === editingMaterial.id ? { ...m, ...data } : m));
    } else {
      setMaterials([...materials, { ...data, id: Date.now(), date: new Date().toLocaleDateString() }]);
    }
    setIsModalOpen(false);
    setEditingMaterial(null);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this material?")) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0F6B75]">Class Materials</h2>
        {role === "Teacher" && (
          <button 
            onClick={() => { setEditingMaterial(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-[#0F6B75] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0c565e] transition-colors"
          >
            <Plus size={18} />
            Add Material
          </button>
        )}
      </div>

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
            
            <div className="flex items-center gap-2">
              {role === "Teacher" ? (
                <>
                  <button 
                    onClick={() => { setEditingMaterial(item); setIsModalOpen(true); }}
                    className="p-2 text-gray-400 hover:text-[#0F6B75] hover:bg-teal-50 rounded-lg transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </>
              ) : (
                <button className="p-2 text-gray-400 hover:text-[#0F6B75] hover:bg-teal-50 rounded-lg transition-colors">
                  <Download size={20} />
                </button>
              )}
            </div>
          </div>
        ))}

        {materials.length === 0 && (
            <div className="text-center py-10 text-gray-400">
                No materials uploaded yet.
            </div>
        )}
      </div>

      {isModalOpen && (
        <MaterialModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSave={handleSave}
            initialData={editingMaterial}
        />
      )}
    </div>
  );
};

export default Material;
