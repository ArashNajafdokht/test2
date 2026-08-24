import React, { useState } from 'react';
import { DailyReport, ScreenType } from '../types';

interface DailyReportsScreenProps {
  reports: DailyReport[];
  onSubmitNewReport: (reportData: {
    projectName: string;
    taskDescription: string;
    hours: number;
    attachmentName?: string;
  }) => void;
  onViewReportDetails: (report: DailyReport) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const DailyReportsScreen: React.FC<DailyReportsScreenProps> = ({
  reports,
  onSubmitNewReport,
  onViewReportDetails,
  onNavigate,
}) => {
  const [projectName, setProjectName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [hours, setHours] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !taskDescription.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitNewReport({
        projectName: projectName.trim(),
        taskDescription: taskDescription.trim(),
        hours: parseFloat(hours) || 8,
        attachmentName: selectedFile ? selectedFile.name : undefined,
      });

      setProjectName('');
      setTaskDescription('');
      setHours('');
      setSelectedFile(null);
      setIsSubmitting(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3500);
    }, 300);
  };

  const handleReset = () => {
    setProjectName('');
    setTaskDescription('');
    setHours('');
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-6 font-['Vazirmatn',sans-serif]">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#191c1e] tracking-tight">
            گزارش روزانه
          </h1>
          <p className="text-[15px] text-[#505f76] mt-1">ثبت و مدیریت فعالیت‌های امروز</p>
        </div>
      </header>

      {/* Success Notification Alert */}
      {successToast && (
        <div
          id="report-success-toast"
          className="p-4 bg-[#27c38a]/15 border border-[#27c38a] rounded-xl flex items-center justify-between text-[#004a31] animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#27c38a] text-[22px]">
              check_circle
            </span>
            <span className="font-semibold text-sm">
              گزارش فعالیت شما با موفقیت ثبت شد و در صف تایید قرار گرفت.
            </span>
          </div>
          <button
            onClick={() => setSuccessToast(false)}
            className="text-[#004a31] hover:text-[#191c1e] p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Form Section (Span 8) */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-2xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
          <h2 className="text-[20px] font-bold text-[#191c1e] border-b border-[#e2e8f0] pb-4 mb-6">
            ثبت گزارش روزانه جدید
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Project Name Field */}
            <div>
              <label
                htmlFor="projectName"
                className="block text-[13.5px] font-medium text-[#444651] mb-2"
              >
                نام پروژه
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="مثلا: توسعه داشبورد مدیریت"
                required
                className="w-full bg-[#F1F5F9] focus:bg-white border-2 border-transparent focus:border-[#00236f] rounded-lg px-4 py-3 text-[14px] text-[#191c1e] outline-none transition-colors"
              />
            </div>

            {/* Task Description Field */}
            <div>
              <label
                htmlFor="taskDesc"
                className="block text-[13.5px] font-medium text-[#444651] mb-2"
              >
                شرح وظایف
              </label>
              <textarea
                id="taskDesc"
                rows={4}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="کارهایی که امروز انجام دادید را شرح دهید..."
                required
                className="w-full bg-[#F1F5F9] focus:bg-white border-2 border-transparent focus:border-[#00236f] rounded-lg px-4 py-3 text-[14px] text-[#191c1e] outline-none transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Hours and File Upload Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Work Hours */}
              <div>
                <label
                  htmlFor="hours"
                  className="block text-[13.5px] font-medium text-[#444651] mb-2"
                >
                  ساعت کارکرد (ساعت)
                </label>
                <input
                  id="hours"
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="مثلا: 8"
                  required
                  className="w-full bg-[#F1F5F9] focus:bg-white border-2 border-transparent focus:border-[#00236f] rounded-lg px-4 py-3 text-[14px] text-[#191c1e] outline-none transition-colors"
                />
              </div>

              {/* File Attachment Upload */}
              <div>
                <label
                  htmlFor="fileUpload"
                  className="block text-[13.5px] font-medium text-[#444651] mb-2"
                >
                  پیوست فایل
                </label>
                <div className="w-full bg-[#F1F5F9] border-2 border-dashed border-[#c5c5d3] hover:border-[#00236f] rounded-lg px-4 py-3 flex items-center justify-center cursor-pointer hover:bg-white transition-colors relative">
                  <input
                    id="fileUpload"
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center gap-2 text-[#505f76]">
                    <span className="material-symbols-outlined text-[22px]">
                      {selectedFile ? 'task' : 'upload_file'}
                    </span>
                    <span className="text-[13.5px] truncate max-w-[180px]">
                      {selectedFile ? selectedFile.name : 'انتخاب فایل'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit / Cancel Buttons */}
            <div className="pt-4 flex justify-end gap-3.5 border-t border-[#e2e8f0] mt-6">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-[#00236f] text-[#00236f] rounded-lg text-[14.5px] font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#00236f] text-white rounded-lg text-[14.5px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-xs disabled:opacity-60"
              >
                {isSubmitting ? 'در حال ثبت...' : 'ثبت گزارش'}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Reports Section (Span 4) */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] h-fit">
          <h2 className="text-[20px] font-bold text-[#191c1e] border-b border-[#e2e8f0] pb-4 mb-6">
            گزارش‌های اخیر
          </h2>

          <div className="space-y-4">
            {reports.slice(0, 4).map((item) => {
              const isApproved = item.status === 'approved';
              const isPending = item.status === 'pending';

              return (
                <div
                  key={item.id}
                  onClick={() => onViewReportDetails(item)}
                  className="p-4 border border-[#e2e8f0] rounded-xl hover:shadow-xs hover:border-[#00236f]/40 transition-all cursor-pointer bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-[#191c1e] text-[15px]">{item.projectName}</h3>
                    {isApproved ? (
                      <span className="bg-[#4edea3]/20 text-[#004a31] px-2.5 py-0.5 rounded text-[11px] font-semibold">
                        تایید شده
                      </span>
                    ) : isPending ? (
                      <span className="bg-[#FCD34D]/25 text-[#B45309] px-2.5 py-0.5 rounded text-[11px] font-semibold">
                        در انتظار
                      </span>
                    ) : (
                      <span className="bg-[#ffdad6] text-[#ba1a1a] px-2.5 py-0.5 rounded text-[11px] font-semibold">
                        رد شده
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#505f76] line-clamp-2 mb-3 leading-relaxed">
                    {item.taskDescription}
                  </p>
                  <div className="flex justify-between items-center text-[#505f76] text-xs">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      <span>{item.hours} ساعت</span>
                    </span>
                    <span className="font-mono text-[11.5px]">{item.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onNavigate('user-management')}
            className="w-full mt-6 text-[#00236f] text-[14px] font-semibold py-2.5 hover:bg-[#f2f4f6] rounded-lg transition-colors border border-transparent cursor-pointer"
          >
            مشاهده همه گزارش‌ها
          </button>
        </div>
      </div>
    </div>
  );
};
