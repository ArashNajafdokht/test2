import React, { useState } from 'react';
import { DailyReport, ScreenType } from '../types';

interface DashboardScreenProps {
  reports: DailyReport[];
  onApproveReport: (id: string) => void;
  onRejectReport: (id: string) => void;
  onViewReportDetails: (report: DailyReport) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  reports,
  onApproveReport,
  onRejectReport,
  onViewReportDetails,
  onNavigate,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(3);
  const [currentMonthName, setCurrentMonthName] = useState('آبان ۱۴۰۲');

  const pendingReports = reports.filter((r) => r.status === 'pending');
  const approvedReports = reports.filter((r) => r.status === 'approved');

  // Calendar configuration for Aban 1402
  const calendarDays = [
    { day: null, isCurrentMonth: false },
    { day: null, isCurrentMonth: false },
    { day: null, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true, dots: [] },
    { day: 2, isCurrentMonth: true, dots: ['green', 'green'] },
    { day: 3, isCurrentMonth: true, dots: ['green', 'red', 'red'], isSelected: true },
    { day: 4, isCurrentMonth: true, dots: ['green'] },
    { day: 5, isCurrentMonth: true, dots: [] },
    { day: 6, isCurrentMonth: true, dots: [] },
    { day: 7, isCurrentMonth: true, dots: [] },
    { day: 8, isCurrentMonth: true, dots: [] },
    { day: 9, isCurrentMonth: true, dots: [] },
    { day: 10, isCurrentMonth: true, dots: [] },
    { day: 11, isCurrentMonth: true, dots: [] },
  ];

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto p-4 md:p-8 font-['Vazirmatn',sans-serif]">
      {/* Statistics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Stat Card 1: Today's Reports */}
        <div
          id="stat-card-total"
          className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[14px] text-[#505f76] font-medium mb-1">گزارش‌های امروز</p>
              <h3 className="text-[32px] font-bold text-[#191c1e] tracking-tight">124</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#dce1ff] flex items-center justify-center text-[#1e3a8a] shadow-xs">
              <span className="material-symbols-outlined text-[24px]">description</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#004a31] text-[13px] font-medium">
            <span className="material-symbols-outlined text-[17px] text-[#27c38a]">trending_up</span>
            <span className="text-[#27c38a] font-semibold">+12% نسبت به دیروز</span>
          </div>
        </div>

        {/* Stat Card 2: Pending Reviews */}
        <div
          id="stat-card-pending"
          className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[14px] text-[#505f76] font-medium mb-1">در انتظار بررسی</p>
              <h3 className="text-[32px] font-bold text-[#191c1e] tracking-tight">
                {pendingReports.length > 0 ? 38 + (pendingReports.length - 3) : 38}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shadow-xs">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#ba1a1a] text-[13px] font-medium">
            <span className="material-symbols-outlined text-[17px]">warning</span>
            <span className="font-semibold">نیاز به اقدام فوری</span>
          </div>
        </div>

        {/* Stat Card 3: Approved */}
        <div
          id="stat-card-approved"
          className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[14px] text-[#505f76] font-medium mb-1">تایید شده</p>
              <h3 className="text-[32px] font-bold text-[#191c1e] tracking-tight">
                {approvedReports.length > 0 ? 86 + (approvedReports.length - 1) : 86}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#d3e4fe] flex items-center justify-center text-[#505f76] shadow-xs">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#505f76] text-[13px] font-medium">
            <span className="material-symbols-outlined text-[17px] text-[#27c38a]">done_all</span>
            <span>تکمیل شده امروز</span>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section
        id="calendar-section"
        className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden"
      >
        <div className="p-5 md:p-6 border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]">
          <h3 className="text-[18px] font-bold text-[#191c1e]">تقویم کاری ({currentMonthName})</h3>
          <div className="flex items-center gap-2">
            <button
              id="calendar-prev-btn"
              onClick={() => setCurrentMonthName('مهر ۱۴۰۲')}
              className="p-2 border border-[#e2e8f0] rounded-lg hover:bg-[#eceef0] transition-colors text-[#505f76] cursor-pointer"
              title="ماه قبل"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
            <button
              id="calendar-next-btn"
              onClick={() => setCurrentMonthName('آذر ۱۴۰۲')}
              className="p-2 border border-[#e2e8f0] rounded-lg hover:bg-[#eceef0] transition-colors text-[#505f76] cursor-pointer"
              title="ماه بعد"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-3 text-center text-[12px] font-semibold text-[#505f76]">
            <div>شنبه</div>
            <div>یکشنبه</div>
            <div>دوشنبه</div>
            <div>سه‌شنبه</div>
            <div>چهارشنبه</div>
            <div>پنج‌شنبه</div>
            <div>جمعه</div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((item, idx) => {
              if (!item.isCurrentMonth || item.day === null) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="h-20 sm:h-24 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]/40 opacity-40 p-2"
                  />
                );
              }

              const isDaySelected = selectedDay === item.day;

              return (
                <div
                  key={`day-${item.day}`}
                  id={`calendar-day-${item.day}`}
                  onClick={() => setSelectedDay(item.day)}
                  className={`h-20 sm:h-24 rounded-xl p-2.5 transition-all cursor-pointer relative ${
                    isDaySelected
                      ? 'bg-[#dce1ff] border-2 border-[#00236f] shadow-xs'
                      : 'bg-white border border-[#e2e8f0] hover:border-[#00236f]'
                  }`}
                >
                  <span
                    className={`text-[14px] ${
                      isDaySelected ? 'text-[#00236f] font-bold' : 'text-[#191c1e] font-medium'
                    }`}
                  >
                    {item.day}
                  </span>

                  {item.dots && item.dots.length > 0 && (
                    <div className="mt-2 flex gap-1 flex-wrap">
                      {item.dots.map((dot, dIdx) => (
                        <span
                          key={dIdx}
                          className={`w-2 h-2 rounded-full ${
                            dot === 'green' ? 'bg-[#27c38a]' : 'bg-[#ba1a1a]'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reports Needing Review Table */}
      <section
        id="review-reports-section"
        className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden"
      >
        <div className="p-5 md:p-6 border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]">
          <h3 className="text-[18px] font-bold text-[#191c1e]">گزارش‌های نیازمند بررسی</h3>
          <button
            id="view-all-reports-btn"
            onClick={() => onNavigate('user-management')}
            className="text-[#00236f] text-[14px] font-semibold hover:underline cursor-pointer"
          >
            مشاهده همه
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#eceef0]/60 text-[#505f76] text-[12px] font-semibold border-b border-[#e2e8f0]">
                <th className="p-4 font-semibold">نام کارمند</th>
                <th className="p-4 font-semibold">بخش</th>
                <th className="p-4 font-semibold">تاریخ گزارش</th>
                <th className="p-4 font-semibold">ساعات کاری</th>
                <th className="p-4 font-semibold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {pendingReports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#505f76]">
                    همه گزارش‌های امروز بررسی شده‌اند. گزارش جدیدی در صف انتظار نیست.
                  </td>
                </tr>
              ) : (
                pendingReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors"
                  >
                    <td className="p-4">
                      <div
                        onClick={() => onViewReportDetails(report)}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <img
                          src={report.userAvatar}
                          alt={report.userName}
                          className="w-9 h-9 rounded-full object-cover border border-[#e2e8f0]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="text-[#191c1e] font-semibold group-hover:text-[#00236f] transition-colors">
                            {report.userName}
                          </span>
                          <p className="text-[12px] text-[#505f76] line-clamp-1">{report.projectName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#444651]">{report.department}</td>
                    <td className="p-4 text-[#444651] font-mono text-xs">{report.date}</td>
                    <td className="p-4 text-[#444651]">{report.hours} ساعت</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          id={`approve-btn-${report.id}`}
                          onClick={() => onApproveReport(report.id)}
                          className="px-3.5 py-1.5 bg-[#27c38a] text-white rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          <span>تایید</span>
                        </button>
                        <button
                          id={`reject-btn-${report.id}`}
                          onClick={() => onRejectReport(report.id)}
                          className="px-3.5 py-1.5 bg-white border border-[#ba1a1a] text-[#ba1a1a] rounded-lg text-[13px] font-semibold hover:bg-[#ffdad6]/30 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                          <span>رد</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
