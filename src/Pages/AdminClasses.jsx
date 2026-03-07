import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { X, Search } from "lucide-react";

const API = "http://localhost:5000/api/class";
const TEACHER_API = "http://localhost:5000/api/teacher/list";

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  const [form, setForm] = useState({
    className: "",
    courseTitle: "",
    classCode: "",
    creditHours: "",
    instructorId: "",
    semester: "",
    capacity: "",
  });

  const [errors, setErrors] = useState({});

  // ================= FETCH CLASSES =================
  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setClasses(res.data?.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= FETCH TEACHERS =================
  const fetchTeachers = useCallback(async () => {
    try {
      setTeacherLoading(true);
      const res = await axios.get(TEACHER_API);
      setTeachers(res.data?.data || []);
    } finally {
      setTeacherLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, [fetchClasses, fetchTeachers]);

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors = {};
    if (!form.className) newErrors.className = "Required";
    if (!form.courseTitle) newErrors.courseTitle = "Required";
    if (!form.classCode) newErrors.classCode = "Required";
    if (!form.instructorId) newErrors.instructorId = "Select teacher";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ================= MODALS =================
  const openAddModal = () => {
    setEditingClass(null);
    setServerError("");
    setForm({
      className: "",
      courseTitle: "",
      classCode: "",
      creditHours: "",
      instructorId: "",
      semester: "",
      capacity: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cls) => {
    setEditingClass(cls);
    setServerError("");
    // Pre-fill form including instructorId
    setForm({
      className: cls.className || "",
      courseTitle: cls.courseTitle || "",
      classCode: cls.classCode || "",
      creditHours: cls.creditHours || "",
      instructorId: cls.instructorId || "", // default teacher
      semester: cls.semester || "",
      capacity: cls.capacity || "",
    });
    setIsModalOpen(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      if (editingClass) {
        await axios.put(`${API}/${editingClass._id}`, form);
      } else {
        await axios.post(API, form);
      }

      setIsModalOpen(false);
      fetchClasses();
    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this class?")) return;
    await axios.delete(`${API}/${id}`);
    fetchClasses();
  };

  // ================= TABLE ROWS =================
  const rows = useMemo(() => {
    const filteredClasses = classes.filter(cls => 
      [cls.className, cls.courseTitle, cls.classCode, cls.semester]
        .some(val => val?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return filteredClasses.map((cls) => (
      <tr key={cls._id} className="border-b last:border-0 hover:bg-gray-50/80 transition-colors">
        <td className="py-3 px-6 text-gray-800 font-medium">{cls.className}</td>
        <td className="py-3 px-6 text-gray-600">{cls.courseTitle}</td>
        <td className="py-3 px-6 text-gray-600">{cls.classCode}</td>
        <td className="py-3 px-6 text-gray-600">{cls.creditHours}</td>
        <td className="py-3 px-6 text-gray-600">{cls.semester}</td>
        <td className="py-3 px-6 flex justify-end gap-2">
          <button
            onClick={() => openEditModal(cls)}
            className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer"
          >
            Update
          </button>

          <button
            onClick={() => handleDelete(cls._id)}
            className="bg-red-600 hover:bg-red-700 transition-colors text-white px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }, [classes, searchQuery]);

  // ================= UI =================
  return (
    <div className="max-w-6xl mx-auto pb-10">
      
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-[1.75rem] font-bold text-[#0F6B75]">Classes Management</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search classes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6B75] bg-white transition-all shadow-sm"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto bg-[#0F6B75] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0c565e] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            + Add Class
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">

        {loading ? (
          <p className="m-5 text-gray-600">Loading classes...</p>
        ) : rows.length === 0 ? (
          <p className="m-5 text-gray-600">No classes found matching your search.</p>
        ) : (
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-gray-50/50 sticky top-0 z-10 shadow-sm">
                <tr className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                  <th className="py-3 px-6">Class</th>
                  <th className="py-3 px-6">Course</th>
                  <th className="py-3 px-6">Code</th>
                  <th className="py-3 px-6">Credits</th>
                  <th className="py-3 px-6">Semester</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* CANCEL BUTTON */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setServerError("");
                setErrors({});
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-[#0F6B75] mb-2">
              {editingClass ? "Update Class" : "Add Class"}
            </h2>
            <p className="text-sm text-gray-500 pb-4">
              {editingClass ? "Edit the details of the class below." : "Enter the details to create a new class."}
            </p>

            {serverError && (
              <p className="text-red-600 text-sm mb-3 font-medium bg-red-50 p-2 rounded">{serverError}</p>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Dynamically generating grid input fields */}
                {[
                  { field: "className", label: "Class Name", type: "text" },
                  { field: "courseTitle", label: "Course Title", type: "text" },
                  { field: "classCode", label: "Class Code", type: "text" },
                  { field: "semester", label: "Semester", type: "text" },
                  { field: "creditHours", label: "Credit Hours", type: "number" },
                  { field: "capacity", label: "Capacity", type: "number" },
                ].map(({ field, label, type }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      name={field}
                      type={type}
                      value={form[field] || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${label}`}
                      className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F6B75] focus:border-transparent transition-all"
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>

              {/* Teacher Dropdown spanning full width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Teacher</label>
                <select
                  name="instructorId"
                  value={form.instructorId || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F6B75] focus:border-transparent transition-all bg-white"
                >
                  <option value="">
                    {teacherLoading ? "Loading teachers..." : "Select Teacher"}
                  </option>

                  {teachers.map((t) => (
                    <option key={t.userId} value={t.userId}>
                      {t.name}
                    </option>
                  ))}
                </select>
                {errors.instructorId && (
                  <p className="text-red-500 text-xs mt-1">{errors.instructorId}</p>
                )}
              </div>

              <button className="w-full bg-[#0F6B75] text-white py-2.5 text-sm rounded-md hover:bg-[#0c565e] disabled:opacity-50 transition-colors font-medium mt-4 shadow-sm cursor-pointer">
                {saving ? "Saving..." : "Save Class"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
