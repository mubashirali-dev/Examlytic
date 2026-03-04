import React from 'react';
import { Eye, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";

const AdminTable = ({ admins, onActionClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Institution</th>
            <th className="px-6 py-4">Email Address</th>
            <th className="px-6 py-4">Created Date</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {admins.map((admin) => (
            <tr key={admin.id} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4 font-bold text-[#012f36]">{admin.name}</td>
              <td className="px-6 py-4 text-gray-700 font-medium">{admin.institution}</td>
              <td className="px-6 py-4 text-gray-500">{admin.email}</td>
              <td className="px-6 py-4 text-gray-500 font-medium">{admin.date}</td>
              <td className="px-6 py-4 text-center">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[0.7rem] font-extrabold uppercase tracking-wider border ${
                  admin.status === 'Active' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {admin.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center items-center gap-3 text-gray-500">
                  <button className="hover:text-[#0F6B75] transition-colors cursor-pointer" title="View Details">
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => onActionClick && onActionClick(admin.status === 'Suspended' ? 'unsuspend' : 'suspend', admin)}
                    className="hover:text-[#0F6B75] transition-colors cursor-pointer" 
                    title={admin.status === 'Suspended' ? "Unsuspend Admin" : "Suspend Admin"}
                  >
                    {admin.status === 'Suspended' ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                  </button>
                  <button 
                    onClick={() => onActionClick && onActionClick('delete', admin)}
                    className="hover:text-red-600 transition-colors cursor-pointer" 
                    title="Delete Admin"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
