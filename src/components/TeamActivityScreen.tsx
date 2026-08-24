import React, { useState } from 'react';
import { DailyReport, User } from '../types';

interface TeamActivityScreenProps {
  reports: DailyReport[];
  users: User[];
  onViewReportDetails: (report: DailyReport) => void;
}

export const TeamActivityScreen: React.FC<TeamActivityScreenProps> = ({
  reports,
  users,
  onViewReportDetails,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = [
    'all',
    'توسعه نرم‌افزار',
    'طراحی UI/UX',
    'پشتیبانی فروش',
    'زیرساخت و DevOps',
  ];

  const filteredReports = reports.filter(
    (r) => selectedDepartment === 'all' || r.department === selectedDepartment
  );

  const totalTeamHours = reports.reduce((acc, curr) => acc + curr.hours, 0);
  const avgDailyHours = (totalTeamHours / (reports.length || 1)).toFixed(1);

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-6 font-['Vazirmatn',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#191c1e] tracking-tight">
            فعالیت‌های تیم
          </h2>
          <p className="text-[15px] text-[#505f76] mt-1.5">
            بررسی زنده و جامع وضعیت ثبت گزارش و کارکرد واحدهای مختلف سازمان.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDepartment === dept
                  ? 'bg-[#00236f] text-white shadow-2xs'
                  : 'bg-white border border-[#e2e8f0] text-[#505f76] hover:bg-[#f2f4f6]'
              }`}
            >
              {dept === 'all' ? 'همه واحدها' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#505f76] font-medium">مجموع ساعت کارکرد تیم</span>
            <span className="material-symbols-outlined text-[#00236f] text-[20px]">timer</span>
          </div>
          <p className="text-2xl font-bold text-[#191c1e] mt-2 font-mono">{totalTeamHours} ساعت</p>
          <span className="text-[11px] text-[#27c38a] font-medium">ثبت شده در ماه جاری</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#505f76] font-medium">میانگین کارکرد روزانه</span>
            <span className="material-symbols-outlined text-[#00236f] text-[20px]">speed</span>
          </div>
          <p className="text-2xl font-bold text-[#191c1e] mt-2 font-mono">{avgDailyHours} ساعت / نفر</p>
          <span className="text-[11px] text-[#505f76]">شاخص بهره‌وری استاندارد</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#505f76] font-medium">پرسنل حاضر و فعال</span>
            <span className="material-symbols-outlined text-[#00236f] text-[20px]">badge</span>
          </div>
          <p className="text-2xl font-bold text-[#191c1e] mt-2 font-mono">{users.length} نفر</p>
          <span className="text-[11px] text-[#27c38a] font-medium">۱۰۰٪ ارسال گزارش امروز</span>
        </div>
      </div>

      {/* Activity Timeline Stream */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs">
        <h3 className="text-[18px] font-bold text-[#191c1e] mb-6">جریان فعالیت‌ها و لاگ‌های اخیر</h3>

        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => onViewReportDetails(report)}
              className="p-4 border border-[#e2e8f0] rounded-xl hover:border-[#00236f]/40 hover:bg-[#f8fafc] transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={report.userAvatar}
                  alt={report.userName}
                  className="w-11 h-11 rounded-full object-cover border border-[#e2e8f0] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#191c1e] text-[15px]">{report.userName}</span>
                    <span className="text-xs text-[#505f76]">• {report.department}</span>
                    <span className="text-xs font-mono text-[#505f76]">[{report.createdAt || '17:00'}]</span>
                  </div>
                  <h4 className="text-[14px] font-semibold text-[#00236f] mt-1">{report.projectName}</h4>
                  <p className="text-[13px] text-[#505f76] mt-0.5 line-clamp-2 leading-relaxed">
                    {report.taskDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#f2f4f6]">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f2f4f6] text-[#191c1e]">
                  {report.hours} ساعت کارکرد
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
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
                    ? 'در انتظار بررسی'
                    : 'رد شده'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
