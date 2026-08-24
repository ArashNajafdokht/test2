import React, { useState } from 'react';
import { DailyReport } from '../types';

interface ArchiveScreenProps {
  reports: DailyReport[];
  onViewReportDetails: (report: DailyReport) => void;
}

export const ArchiveScreen: React.FC<ArchiveScreenProps> = ({
  reports,
  onViewReportDetails,
}) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = reports.filter((r) => {
    const match =
      r.projectName.toLowerCase().includes(query.toLowerCase()) ||
      r.userName.toLowerCase().includes(query.toLowerCase()) ||
      r.taskDescription.toLowerCase().includes(query.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return match && matchStatus;
  });

  const handleExportCSV = () => {
    const headers = 'ردیف,نام کارمند,واحد,نام پروژه,ساعت کارکرد,تاریخ,وضعیت\n';
    const rows = filtered
      .map(
        (r, i) =>
          `${i + 1},${r.userName},${r.department},${r.projectName},${r.hours},${r.date},${r.status}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `worklog_reports_archive_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-6 font-['Vazirmatn',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#191c1e] tracking-tight">
            آرشیو و بایگانی گزارش‌ها
          </h2>
          <p className="text-[15px] text-[#505f76] mt-1.5">
            جستجو در سوابق کاری، بایگانی تاریخی و صدور خروجی گزارشات.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#00236f] text-white rounded-lg text-[13.5px] font-semibold hover:bg-[#1e3a8a] transition-colors cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>خروجی اکسل / CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#505f76] text-[19px]">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در متن وظایف، پروژه یا نام..."
            className="w-full pl-3 pr-10 py-2 bg-[#f2f4f6] border border-[#e2e8f0] rounded-lg text-[13.5px] text-[#191c1e] outline-none focus:bg-white focus:border-[#00236f]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-[#505f76] font-medium whitespace-nowrap">وضعیت:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#f2f4f6] border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#191c1e] outline-none cursor-pointer"
          >
            <option value="all">همه</option>
            <option value="approved">تایید شده</option>
            <option value="pending">در انتظار</option>
            <option value="rejected">رد شده</option>
          </select>
        </div>
      </div>

      {/* Archive Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#f2f4f6] text-[#505f76] border-b border-[#e2e8f0] text-[12px] font-semibold">
                <th className="py-3.5 px-4">ردیف</th>
                <th className="py-3.5 px-4">پروژه و شرح فعالیت</th>
                <th className="py-3.5 px-4">ارسال‌کننده</th>
                <th className="py-3.5 px-4">واحد</th>
                <th className="py-3.5 px-4">ساعت</th>
                <th className="py-3.5 px-4">تاریخ ثبت</th>
                <th className="py-3.5 px-4">وضعیت</th>
                <th className="py-3.5 px-4 text-center">جزئیات</th>
              </tr>
            </thead>
            <tbody className="text-[13.5px]">
              {filtered.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors"
                >
                  <td className="py-3.5 px-4 text-[#505f76] font-mono text-xs">{idx + 1}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#191c1e]">{item.projectName}</p>
                    <p className="text-xs text-[#505f76] line-clamp-1 mt-0.5">{item.taskDescription}</p>
                  </td>
                  <td className="py-3.5 px-4 text-[#191c1e] font-medium">{item.userName}</td>
                  <td className="py-3.5 px-4 text-[#505f76] text-xs">{item.department}</td>
                  <td className="py-3.5 px-4 text-[#191c1e] font-semibold">{item.hours} س</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#505f76]">{item.date}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        item.status === 'approved'
                          ? 'bg-[#27c38a]/15 text-[#004a31]'
                          : item.status === 'pending'
                          ? 'bg-[#f59e0b]/15 text-[#b45309]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {item.status === 'approved'
                        ? 'تایید شده'
                        : item.status === 'pending'
                        ? 'در انتظار'
                        : 'رد شده'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onViewReportDetails(item)}
                      className="p-1 text-[#00236f] hover:bg-[#d0e1fb] rounded-lg transition-colors cursor-pointer"
                      title="مشاهده گزارش کامل"
                    >
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
