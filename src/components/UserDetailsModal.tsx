import React from 'react';
import { User, DailyReport } from '../types';

interface UserDetailsModalProps {
  user: User | null;
  allUsersModal?: boolean;
  users?: User[];
  reports: DailyReport[];
  isOpen: boolean;
  onClose: () => void;
  onSelectUser?: (user: User) => void;
  onViewReportDetails: (report: DailyReport) => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  allUsersModal = false,
  users = [],
  reports,
  isOpen,
  onClose,
  onSelectUser,
  onViewReportDetails,
}) => {
  if (!isOpen) return null;

  if (allUsersModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Vazirmatn',sans-serif]">
        <div className="bg-white border border-[#e2e8f0] rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#00236f] text-[24px]">group</span>
              <h3 className="text-[17px] font-bold text-[#191c1e]">فهرست تمام کاربران و پرسنل فعال</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#505f76] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto divide-y divide-[#f2f4f6]">
            {users.map((u) => {
              const userReports = reports.filter((r) => r.userId === u.id);
              return (
                <div
                  key={u.id}
                  onClick={() => {
                    if (onSelectUser) onSelectUser(u);
                  }}
                  className="py-3.5 flex items-center justify-between hover:bg-[#f8fafc] px-3 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={u.avatarUrl}
                      alt={u.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#e2e8f0]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#191c1e]">{u.name}</h4>
                      <p className="text-xs text-[#505f76]">{u.role} • {u.department}</p>
                      <p className="text-[11px] text-[#00236f] font-mono">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-semibold text-[#191c1e] block">
                      {userReports.length || u.reportsCount} گزارش
                    </span>
                    <span className="text-[11px] text-[#27c38a]">فعال</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#00236f] text-white text-xs font-semibold rounded-lg hover:bg-[#1e3a8a] cursor-pointer"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userReports = reports.filter((r) => r.userId === user.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Vazirmatn',sans-serif]">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl w-full max-w-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#00236f]"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-[17px] font-bold text-[#191c1e]">{user.name}</h3>
              <p className="text-xs text-[#505f76]">{user.role} • {user.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#505f76] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-right">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
              <span className="text-[11px] text-[#505f76] block">پست الکترونیکی:</span>
              <span className="text-xs font-mono text-[#00236f] font-semibold">{user.email}</span>
            </div>
            <div className="p-3.5 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
              <span className="text-[11px] text-[#505f76] block">وضعیت دسترسی:</span>
              <span className="text-xs text-[#004a31] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#27c38a]"></span> فعال در سامانه
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#191c1e] mb-3">سوابق و گزارش‌های ثبت شده</h4>
            <div className="space-y-2.5">
              {userReports.length === 0 ? (
                <p className="text-xs text-[#505f76] p-4 text-center bg-[#f8fafc] rounded-xl">
                  هنوز گزارشی توسط این کاربر ثبت نشده است.
                </p>
              ) : (
                userReports.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      onClose();
                      onViewReportDetails(r);
                    }}
                    className="p-3 border border-[#e2e8f0] rounded-xl hover:border-[#00236f] transition-colors cursor-pointer flex items-center justify-between bg-white"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#191c1e]">{r.projectName}</p>
                      <p className="text-[11px] font-mono text-[#505f76]">{r.date} • {r.hours} ساعت</p>
                    </div>
                    <span
                      className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${
                        r.status === 'approved'
                          ? 'bg-[#27c38a]/15 text-[#004a31]'
                          : r.status === 'pending'
                          ? 'bg-[#f59e0b]/15 text-[#b45309]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {r.status === 'approved'
                        ? 'تایید شده'
                        : r.status === 'pending'
                        ? 'در انتظار'
                        : 'رد شده'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#00236f] text-white text-xs font-semibold rounded-lg hover:bg-[#1e3a8a] cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
