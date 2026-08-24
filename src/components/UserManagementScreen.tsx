import React, { useState } from 'react';
import { DailyReport, User } from '../types';

interface UserManagementScreenProps {
  reports: DailyReport[];
  users: User[];
  onViewReportDetails: (report: DailyReport) => void;
  onDeleteReport: (id: string) => void;
  onSelectUser: (user: User) => void;
  onViewAllUsersModal: () => void;
}

export const UserManagementScreen: React.FC<UserManagementScreenProps> = ({
  reports,
  users,
  onViewReportDetails,
  onDeleteReport,
  onSelectUser,
  onViewAllUsersModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-6 font-['Vazirmatn',sans-serif]">
      {/* Page Header */}
      <div>
        <h2 className="text-[26px] md:text-[32px] font-bold text-[#191c1e] tracking-tight">
          مدیریت کاربران و گزارش‌ها
        </h2>
        <p className="text-[15px] text-[#505f76] mt-1.5">
          بررسی فعالیت‌ها و مدیریت دسترسی کارمندان سازمان.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Advanced Reports Table (Span 8) */}
        <section
          id="reports-management-card"
          className="xl:col-span-8 bg-white rounded-2xl border border-[#e2e8f0] p-6 flex flex-col shadow-xs"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-[18px] font-bold text-[#191c1e]">کل گزارش‌های کارمندان</h3>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Search input */}
              <div className="relative flex-1 sm:w-48">
                <span
                  className="material-symbols-outlined absolute right-3 top-2.5 text-[#505f76] text-[18px] pointer-events-none"
                  data-icon="search"
                >
                  search
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجوی نام..."
                  className="w-full pl-3 pr-9 py-2 bg-[#f2f4f6] border border-[#e2e8f0] rounded-lg text-[13.5px] text-[#191c1e] focus:bg-white focus:border-[#00236f] focus:ring-1 focus:ring-[#00236f] outline-none transition-all"
                />
              </div>

              {/* Status Select */}
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute right-3 top-2.5 text-[#505f76] text-[18px] pointer-events-none"
                  data-icon="filter_alt"
                >
                  filter_alt
                </span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="pl-7 pr-9 py-2 bg-[#f2f4f6] border border-[#e2e8f0] rounded-lg text-[13.5px] text-[#191c1e] focus:bg-white focus:border-[#00236f] focus:ring-1 focus:ring-[#00236f] outline-none appearance-none cursor-pointer"
                >
                  <option value="all">همه وضعیت‌ها</option>
                  <option value="approved">تایید شده</option>
                  <option value="pending">در انتظار</option>
                  <option value="rejected">رد شده</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#f2f4f6] text-[#505f76] border-b border-[#e2e8f0] text-[12px] font-semibold">
                  <th className="py-3.5 px-4 font-semibold">ردیف</th>
                  <th className="py-3.5 px-4 font-semibold">نام کارمند</th>
                  <th className="py-3.5 px-4 font-semibold">تاریخ گزارش</th>
                  <th className="py-3.5 px-4 font-semibold">وضعیت</th>
                  <th className="py-3.5 px-4 font-semibold text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-[#505f76]">
                      گزارشی با این مشخصات یافت نشد.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report, idx) => {
                    const isApproved = report.status === 'approved';
                    const isPending = report.status === 'pending';

                    return (
                      <tr
                        key={report.id}
                        className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors"
                      >
                        <td className="py-3.5 px-4 text-[#505f76] font-mono text-xs">{idx + 1}</td>
                        <td className="py-3.5 px-4 text-[#191c1e] font-semibold">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={report.userAvatar}
                              alt={report.userName}
                              className="w-7 h-7 rounded-full object-cover border border-[#e2e8f0]"
                              referrerPolicy="no-referrer"
                            />
                            <span>{report.userName}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#505f76] font-mono text-xs">
                          {report.date}
                        </td>
                        <td className="py-3.5 px-4">
                          {isApproved ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#004a31]/10 text-[#004a31] text-[11.5px] font-semibold">
                              تایید شده
                            </span>
                          ) : isPending ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 text-[#d97706] text-[11.5px] font-semibold">
                              در انتظار بررسی
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] text-[11.5px] font-semibold">
                              رد شده
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-left space-x-2 space-x-reverse">
                          <button
                            id={`view-details-btn-${report.id}`}
                            onClick={() => onViewReportDetails(report)}
                            className="p-1 text-[#00236f] hover:text-[#1e3a8a] transition-colors cursor-pointer"
                            title="مشاهده جزئیات گزارش"
                          >
                            <span className="material-symbols-outlined text-[20px]" data-icon="visibility">
                              visibility
                            </span>
                          </button>
                          <button
                            id={`delete-report-btn-${report.id}`}
                            onClick={() => {
                              if (confirm(`آیا از حذف گزارش «${report.projectName}» اطمینان دارید؟`)) {
                                onDeleteReport(report.id);
                              }
                            }}
                            className="p-1 text-[#ba1a1a] hover:text-[#93000a] transition-colors cursor-pointer"
                            title="حذف گزارش"
                          >
                            <span className="material-symbols-outlined text-[20px]" data-icon="delete">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* User Management Section (Span 4) */}
        <section
          id="active-users-card"
          className="xl:col-span-4 bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs h-fit"
        >
          <h3 className="text-[18px] font-bold text-[#191c1e] mb-6">کاربران فعال</h3>
          <div className="space-y-3.5">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => onSelectUser(user)}
                className="flex items-center justify-between p-3.5 border border-[#e2e8f0] rounded-xl hover:shadow-xs hover:border-[#00236f]/40 transition-all cursor-pointer bg-white group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#e2e8f0] shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#191c1e] group-hover:text-[#00236f] transition-colors">
                      {user.name}
                    </h4>
                    <p className="text-[12.5px] text-[#505f76] mt-0.5">
                      {user.role} • {user.department.split(' ')[0]}
                    </p>
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-[#757682] text-[20px] group-hover:-translate-x-1 transition-transform"
                  data-icon="chevron_left"
                >
                  chevron_left
                </span>
              </div>
            ))}
          </div>

          <button
            id="view-all-users-btn"
            onClick={onViewAllUsersModal}
            className="w-full mt-6 py-2.5 border-2 border-[#00236f] text-[#00236f] font-semibold text-[14px] rounded-lg hover:bg-[#00236f]/5 active:scale-[0.99] transition-all cursor-pointer"
          >
            مشاهده همه کاربران
          </button>
        </section>
      </div>
    </div>
  );
};
