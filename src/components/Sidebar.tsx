import React from 'react';
import { ScreenType } from '../types';
import { LOGO_URL } from '../data/mockData';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenNewReport: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onOpenNewReport,
  onOpenHelp,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ScreenType,
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'daily-reports' as ScreenType,
      label: 'Daily Reports',
      icon: 'description',
    },
    {
      id: 'team-activity' as ScreenType,
      label: 'Team Activity',
      icon: 'group',
    },
    {
      id: 'user-management' as ScreenType,
      label: 'User Management',
      icon: 'manage_accounts',
    },
    {
      id: 'archive' as ScreenType,
      label: 'Archive',
      icon: 'history',
    },
  ];

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          id="mobile-sidebar-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        id="app-sidebar"
        className={`fixed right-0 top-0 bottom-0 w-[280px] bg-white border-l border-[#e2e8f0] flex flex-col justify-between py-6 z-50 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="px-6 mb-6 flex items-center justify-between">
          <div
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden bg-[#e6e8ea] shrink-0 border border-[#e2e8f0] flex items-center justify-center p-0.5 shadow-xs transition-transform group-hover:scale-105">
              <img
                src={LOGO_URL}
                alt="WorkLog Admin Logo"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-[19px] font-bold text-[#00236f] leading-tight tracking-tight">
                WorkLog Admin
              </h1>
              <p className="text-[13px] text-[#505f76] font-medium">Enterprise Edition</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            id="close-mobile-sidebar-btn"
            onClick={onCloseMobile}
            className="md:hidden text-[#505f76] hover:text-[#00236f] p-1.5 rounded-lg hover:bg-[#f2f4f6]"
            aria-label="بستن منو"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Primary CTA */}
        <div className="px-4 mb-5">
          <button
            id="sidebar-create-report-btn"
            onClick={() => {
              onOpenNewReport();
              onCloseMobile();
            }}
            className="w-full bg-[#00236f] text-white py-3 px-4 rounded-lg font-medium text-[15px] hover:bg-[#1e3a8a] active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Create New Report</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 text-[14.5px] rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#d0e1fb] text-[#00236f] font-semibold border-r-4 border-[#00236f] shadow-xs'
                    : 'text-[#505f76] hover:bg-[#f2f4f6] hover:text-[#191c1e]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="font-['Vazirmatn',sans-serif]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Navigation */}
        <div className="mt-auto border-t border-[#e2e8f0] pt-4 px-3 space-y-1">
          <button
            id="sidebar-help-btn"
            onClick={() => {
              onOpenHelp();
              onCloseMobile();
            }}
            className="w-full flex items-center gap-3.5 text-[#505f76] px-4 py-2.5 hover:bg-[#f2f4f6] hover:text-[#00236f] transition-all duration-200 rounded-lg text-[14px] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[21px]">help</span>
            <span className="font-['Vazirmatn',sans-serif]">Help Center</span>
          </button>

          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 text-[#ba1a1a] px-4 py-2.5 hover:bg-[#ffdad6]/40 transition-all duration-200 rounded-lg text-[14px] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[21px]">logout</span>
            <span className="font-['Vazirmatn',sans-serif]">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
