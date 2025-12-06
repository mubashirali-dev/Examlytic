import { Trash2 } from "lucide-react";

const ClassCard = ({ title, section, image, onView, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-full relative group hover:shadow-xl transition-shadow p-3">
      <div className="aspect-video overflow-hidden rounded-xl w-full bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="pt-4 px-2 pb-4 flex flex-col grow">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-[#0F6B75] font-medium mb-6">{section}</p>

        <div className="mt-auto">
          <button 
            onClick={onView}
            className="bg-[#0F6B75] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0c565e] transition-colors"
          >
            View Class
          </button>
        </div>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering parent clicks if any
          onDelete();
        }}
        className="rounded-full absolute -bottom-3 right-4 text-white hover:opacity-90 transition-opacity shadow-md"
      >
        <div className="bg-[#0F6B75] p-2 rounded-full">
          <Trash2 size={18} />
        </div>
      </button>
    </div>
  );
};

export default ClassCard;
