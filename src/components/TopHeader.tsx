import React, { useState, useRef, useEffect } from 'react';
import { AppNotification, ScreenType } from '../types';
import { ADMIN_AVATAR } from '../data/mockData';

interface TopHeaderProps {
  currentScreen: ScreenType;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onOpenMobileSidebar: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentScreen,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  onOpenMobileSidebar,
  onNavigate,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'dashboard':
        return 'داشبورد مدیریت';
      case 'daily-reports':
        return 'گزارش روزانه';
      case 'user-management':
        return 'مدیریت کاربران و گزارش‌ها';
      case 'team-activity':
        return 'فعالیت‌های تیم';
      case 'archive':
        return 'آرشیو گزارش‌ها';
      default:
        return 'داشبورد مدیریت';
    }
  };

  return (
    <header
      id="top-header"
      className="bg-[#f7f9fb] border-b border-[#e2e8f0] sticky top-0 z-30 px-4 md:px-8 py-3.5 flex items-center justify-between transition-colors"
    >
      {/* Mobile Title & Menu button */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          id="mobile-menu-toggle-btn"
          onClick={onOpenMobileSidebar}
          className="p-2 text-[#00236f] hover:bg-[#eceef0] rounded-lg transition-colors cursor-pointer"
          aria-label="باز کردن منو"
        >
          <span className="material-symbols-outlined text-[26px]">menu</span>
        </button>
        <span className="text-[17px] font-bold text-[#00236f]">WorkLog Pro</span>
      </div>

      {/* Desktop Screen Title */}
      <div className="hidden md:flex items-center gap-2">
        <h2 className="text-[22px] font-bold text-[#191c1e] tracking-tight">
          {getScreenTitle()}
        </h2>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            id="notifications-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#505f76] hover:text-[#00236f] hover:bg-[#eceef0] rounded-full transition-colors relative cursor-pointer"
            aria-label="اعلانات"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              id="notifications-dropdown"
              className="absolute left-0 mt-2 w-80 sm:w-96 bg-white border border-[#e2e8f0] rounded-xl shadow-lg z-50 overflow-hidden text-right"
            >
              <div className="p-3.5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-[#191c1e]">اعلانات سیستم</span>
                  {unreadCount > 0 && (
                    <span className="bg-[#d0e1fb] text-[#00236f] text-xs font-semibold px-2 py-0.5 rounded-full">
                      {unreadCount} جدید
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onClearAllNotifications}
                    className="text-xs text-[#00236f] hover:underline cursor-pointer"
                  >
                    خواندن همه
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#f2f4f6]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-[#505f76]">
                    هیچ اعلان جدیدی وجود ندارد
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-3.5 hover:bg-[#f8fafc] transition-colors cursor-pointer flex gap-3 items-start ${
                        !notif.read ? 'bg-[#d0e1fb]/15' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          notif.type === 'success'
                            ? 'bg-[#27c38a]/15 text-[#004a31]'
                            : notif.type === 'warning'
                            ? 'bg-[#f59e0b]/15 text-[#b45309]'
                            : 'bg-[#d0e1fb] text-[#00236f]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {notif.type === 'success'
                            ? 'check_circle'
                            : notif.type === 'warning'
                            ? 'priority_high'
                            : 'info'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-semibold text-[#191c1e]">{notif.title}</h4>
                          <span className="text-[11px] text-[#505f76]">{notif.time}</span>
                        </div>
                        <p className="text-xs text-[#505f76] mt-0.5 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative" ref={userRef}>
          <div
            id="user-profile-pill"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 cursor-pointer p-1.5 pr-2.5 rounded-lg hover:bg-[#eceef0] transition-colors select-none"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#c5c5d3] bg-[#e0e3e5] shrink-0 shadow-2xs">
              <img
                src={ADMIN_AVATAR}
                alt="مدیر سیستم"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[14px] font-semibold text-[#191c1e] hidden sm:block">
              مدیر سیستم
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#505f76] hidden sm:block">
              expand_more
            </span>
          </div>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div
              id="user-menu-dropdown"
              className="absolute left-0 mt-2 w-56 bg-white border border-[#e2e8f0] rounded-xl shadow-lg z-50 p-2 text-right"
            >
              <div className="p-2 border-b border-[#f2f4f6] mb-1">
                <p className="text-xs font-bold text-[#191c1e]">مدیر سیستم (ادمین)</p>
                <p className="text-[11px] text-[#505f76]">admin@worklog.enterprise</p>
              </div>
              <button
                onClick={() => {
                  onNavigate('user-management');
                  setShowUserMenu(false);
                }}
                className="w-full flex items-center gap-2 p-2 text-xs text-[#191c1e] hover:bg-[#f2f4f6] rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#505f76]">
                  manage_accounts
                </span>
                <span>مدیریت دسترسی‌ها</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('daily-reports');
                  setShowUserMenu(false);
                }}
                className="w-full flex items-center gap-2 p-2 text-xs text-[#191c1e] hover:bg-[#f2f4f6] rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#505f76]">
                  post_add
                </span>
                <span>ثبت گزارش شخصی</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
