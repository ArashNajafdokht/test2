import React, { useState } from 'react';

interface NewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    projectName: string;
    taskDescription: string;
    hours: number;
    attachmentName?: string;
  }) => void;
}

export const NewReportModal: React.FC<NewReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [projectName, setProjectName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [hours, setHours] = useState('8');
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !taskDescription.trim()) return;
    onSubmit({
      projectName: projectName.trim(),
      taskDescription: taskDescription.trim(),
      hours: parseFloat(hours) || 8,
      attachmentName: file ? file.name : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Vazirmatn',sans-serif]">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#00236f] text-[24px]">post_add</span>
            <h3 className="text-[17px] font-bold text-[#191c1e]">ثبت گزارش فعالیت جدید</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#505f76] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-right">
          <div>
            <label className="block text-xs font-semibold text-[#444651] mb-1.5">
              نام پروژه یا عنوان فعالیت
            </label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="مثلا: بازطراحی ماژول پرداخت"
              className="w-full bg-[#f2f4f6] focus:bg-white border-2 border-transparent focus:border-[#00236f] rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#444651] mb-1.5">
              شرح اقدامات و کارهای انجام شده
            </label>
            <textarea
              required
              rows={4}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="توضیحات کامل اقدامات انجام شده، موانع و دستاوردها..."
              className="w-full bg-[#f2f4f6] focus:bg-white border-2 border-transparent focus:border-[#00236f] rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#444651] mb-1.5">
                ساعت کارکرد (ساعت)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                required
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-[#f2f4f6] focus:bg-white border-2 border-transparent focus:border-[#00236f] rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#444651] mb-1.5">پیوست مستندات</label>
              <label className="w-full bg-[#f2f4f6] border border-dashed border-[#c5c5d3] hover:border-[#00236f] rounded-lg px-3 py-2 flex items-center justify-center cursor-pointer hover:bg-white transition-colors h-[42px]">
                <input
                  type="file"
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  className="hidden"
                />
                <span className="text-xs text-[#505f76] truncate">
                  {file ? file.name : 'انتخاب فایل...'}
                </span>
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-[#e2e8f0] flex justify-end gap-2.5 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#c5c5d3] text-[#505f76] rounded-lg text-xs font-semibold hover:bg-[#f2f4f6] cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#00236f] text-white rounded-lg text-xs font-semibold hover:bg-[#1e3a8a] cursor-pointer shadow-xs"
            >
              ثبت و ارسال گزارش
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
