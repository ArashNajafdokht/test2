import React from 'react';
import { DailyReport } from '../types';

interface ReportDetailsModalProps {
  report: DailyReport | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  report,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Vazirmatn',sans-serif]">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl w-full max-w-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <img
              src={report.userAvatar}
              alt={report.userName}
              className="w-10 h-10 rounded-full object-cover border border-[#e2e8f0]"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-[16px] font-bold text-[#191c1e]">{report.userName}</h3>
              <p className="text-xs text-[#505f76]">{report.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#505f76] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-right max-h-[75vh] overflow-y-auto">
          {/* Status and Date row */}
          <div className="flex items-center justify-between p-3.5 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
            <div>
              <span className="text-xs text-[#505f76] block mb-0.5">وضعیت بررسی:</span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block ${
                  report.status === 'approved'
                    ? 'bg-[#27c38a]/15 text-[#004a31]'
                    : report.status === 'pending'
                    ? 'bg-[#f59e0b]/15 text-[#b45309]'
                    : 'bg-[#ffdad6] text-[#ba1a1a]'
                }`}
              >
                {report.status === 'approved'
                  ? 'تایید شده'
                  : report.status === 'pending'
                  ? 'در انتظار بررسی مدیریت'
                  : 'رد شده'}
              </span>
            </div>

            <div className="text-left">
              <span className="text-xs text-[#505f76] block mb-0.5">تاریخ و زمان ثبت:</span>
              <span className="text-xs font-mono font-semibold text-[#191c1e]">{report.date}</span>
            </div>
          </div>

          {/* Project Title */}
          <div>
            <span className="text-xs font-semibold text-[#505f76] block mb-1">نام پروژه:</span>
            <h4 className="text-[17px] font-bold text-[#00236f]">{report.projectName}</h4>
          </div>

          {/* Work Hours */}
          <div>
            <span className="text-xs font-semibold text-[#505f76] block mb-1">ساعت کارکرد:</span>
            <div className="inline-flex items-center gap-1.5 bg-[#d0e1fb] text-[#00236f] font-bold text-sm px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>{report.hours} ساعت کاری</span>
            </div>
          </div>

          {/* Task Description */}
          <div>
            <span className="text-xs font-semibold text-[#505f76] block mb-1">
              شرح وظایف و اقدامات انجام شده:
            </span>
            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm text-[#191c1e] leading-relaxed whitespace-pre-wrap">
              {report.taskDescription}
            </div>
          </div>

          {/* Attachment */}
          {report.attachmentName && (
            <div>
              <span className="text-xs font-semibold text-[#505f76] block mb-1">فایل پیوست:</span>
              <div className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-xl bg-white">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#00236f] text-[22px]">
                    attach_file
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#191c1e]">{report.attachmentName}</p>
                    <p className="text-[11px] text-[#505f76]">{report.attachmentSize || 'ضمیمه استاندارد'}</p>
                  </div>
                </div>
                <button
                  onClick={() => alert(`دانلود فایل «${report.attachmentName}» آغاز شد.`)}
                  className="px-3 py-1 bg-[#f2f4f6] hover:bg-[#e2e8f0] text-[#00236f] rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>دریافت</span>
                </button>
              </div>
            </div>
          )}

          {/* Reviewer Feedback if any */}
          {report.reviewerFeedback && (
            <div className="p-3.5 bg-[#ffdad6]/40 border border-[#ba1a1a]/30 rounded-xl">
              <span className="text-xs font-bold text-[#ba1a1a] block mb-1">
                بازخورد مسئول تایید:
              </span>
              <p className="text-xs text-[#191c1e] leading-relaxed">{report.reviewerFeedback}</p>
            </div>
          )}
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#c5c5d3] text-[#505f76] rounded-lg text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            بستن
          </button>

          {report.status === 'pending' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onReject(report.id);
                  onClose();
                }}
                className="px-4 py-2 border border-[#ba1a1a] text-[#ba1a1a] rounded-lg text-xs font-semibold hover:bg-[#ffdad6]/40 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
                <span>رد گزارش</span>
              </button>
              <button
                onClick={() => {
                  onApprove(report.id);
                  onClose();
                }}
                className="px-5 py-2 bg-[#27c38a] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>تایید گزارش</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
