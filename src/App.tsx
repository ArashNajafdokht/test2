import React, { useState, useEffect } from 'react';
import { DailyReport, User, AppNotification, ScreenType } from './types';
import {
  INITIAL_REPORTS,
  INITIAL_USERS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { DailyReportsScreen } from './components/DailyReportsScreen';
import { UserManagementScreen } from './components/UserManagementScreen';
import { TeamActivityScreen } from './components/TeamActivityScreen';
import { ArchiveScreen } from './components/ArchiveScreen';
import { NewReportModal } from './components/NewReportModal';
import { ReportDetailsModal } from './components/ReportDetailsModal';
import { UserDetailsModal } from './components/UserDetailsModal';
import { HelpCenterModal } from './components/HelpCenterModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');

  const [reports, setReports] = useState<DailyReport[]>(() => {
    const saved = localStorage.getItem('worklog_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [users] = useState<User[]>(INITIAL_USERS);

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('worklog_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Modals state
  const [isNewReportOpen, setIsNewReportOpen] = useState(false);
  const [selectedReportDetails, setSelectedReportDetails] = useState<DailyReport | null>(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState<User | null>(null);
  const [isAllUsersModalOpen, setIsAllUsersModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('worklog_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('worklog_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Actions
  const handleApproveReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    const target = reports.find((r) => r.id === id);
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'گزارش تایید شد',
      message: `گزارش «${target?.projectName || 'پروژه'}» توسط مدیر سیستم تایید گردید.`,
      time: 'هم‌اکنون',
      read: false,
      type: 'success',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleRejectReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
    const target = reports.find((r) => r.id === id);
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'گزارش رد شد',
      message: `گزارش «${target?.projectName || 'پروژه'}» جهت بازبینی به کارمند عودت داده شد.`,
      time: 'هم‌اکنون',
      read: false,
      type: 'warning',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleDeleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmitNewReport = (data: {
    projectName: string;
    taskDescription: string;
    hours: number;
    attachmentName?: string;
  }) => {
    const newReport: DailyReport = {
      id: `rep-${Date.now()}`,
      userId: 'u1',
      userName: 'علی احمدی',
      userAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDUpBrpgVh95Xfl1UtPGOv2Xib_nZ-SF-B_cT2gKWn76upR0KypQbng5jzDIm48PWj2WnFJfc43t40Uul0jQTA2qlIljPwcHy9S7JQ5EmicU1Jr9bDbzPvd-IzV6DpPOAvvoN4lf3yPy4omvZuJXaw5l9to-hIpzNQEbWAxWajgHqfeVT3a9s-mY9-g6q2SY60zXyo5wzOWgRqlykh-ywCEJqwFDcrVcfycBR2tfcBAR7-kEyBynYR_',
      department: 'توسعه نرم‌افزار',
      projectName: data.projectName,
      taskDescription: data.taskDescription,
      hours: data.hours,
      date: '۱۴۰۲/۰۸/۱۵',
      isoDate: '2023-11-06',
      status: 'pending',
      attachmentName: data.attachmentName,
      createdAt: 'هم‌اکنون',
    };

    setReports((prev) => [newReport, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'گزارش جدید ثبت شد',
      message: `گزارش جدید برای پروژه «${data.projectName}» با موفقیت اضافه شد.`,
      time: 'هم‌اکنون',
      read: false,
      type: 'info',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  // Render Login Screen if unauthenticated or on login view
  if (!isAuthenticated || currentScreen === 'login') {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col md:flex-row relative selection:bg-[#d0e1fb] selection:text-[#00236f]">
      {/* Fixed Desktop / Drawer Mobile Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenNewReport={() => setIsNewReportOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onLogout={handleLogout}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content View (Offset by 280px on desktop) */}
      <div className="flex-1 md:mr-[280px] flex flex-col min-h-screen pb-20 md:pb-8">
        {/* Top Header */}
        <TopHeader
          currentScreen={currentScreen}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onClearAllNotifications={handleClearAllNotifications}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onNavigate={setCurrentScreen}
        />

        {/* Dynamic Screen Content */}
        <main className="flex-1">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              reports={reports}
              onApproveReport={handleApproveReport}
              onRejectReport={handleRejectReport}
              onViewReportDetails={(rep) => setSelectedReportDetails(rep)}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'daily-reports' && (
            <DailyReportsScreen
              reports={reports}
              onSubmitNewReport={handleSubmitNewReport}
              onViewReportDetails={(rep) => setSelectedReportDetails(rep)}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'user-management' && (
            <UserManagementScreen
              reports={reports}
              users={users}
              onViewReportDetails={(rep) => setSelectedReportDetails(rep)}
              onDeleteReport={handleDeleteReport}
              onSelectUser={(u) => setSelectedUserDetails(u)}
              onViewAllUsersModal={() => setIsAllUsersModalOpen(true)}
            />
          )}

          {currentScreen === 'team-activity' && (
            <TeamActivityScreen
              reports={reports}
              users={users}
              onViewReportDetails={(rep) => setSelectedReportDetails(rep)}
            />
          )}

          {currentScreen === 'archive' && (
            <ArchiveScreen
              reports={reports}
              onViewReportDetails={(rep) => setSelectedReportDetails(rep)}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation Bar (as per design spec) */}
        <nav
          id="mobile-bottom-nav"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e2e8f0] flex items-center justify-around py-2.5 px-2 shadow-lg"
        >
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${
              currentScreen === 'dashboard' ? 'text-[#00236f] font-bold' : 'text-[#505f76]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={currentScreen === 'dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              dashboard
            </span>
            <span className="text-[11px]">داشبورد</span>
          </button>

          <button
            onClick={() => setCurrentScreen('daily-reports')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${
              currentScreen === 'daily-reports' ? 'text-[#00236f] font-bold' : 'text-[#505f76]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={currentScreen === 'daily-reports' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              description
            </span>
            <span className="text-[11px]">گزارش‌ها</span>
          </button>

          <button
            onClick={() => setCurrentScreen('team-activity')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${
              currentScreen === 'team-activity' ? 'text-[#00236f] font-bold' : 'text-[#505f76]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={currentScreen === 'team-activity' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              group
            </span>
            <span className="text-[11px]">تیم</span>
          </button>

          <button
            onClick={() => setCurrentScreen('user-management')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${
              currentScreen === 'user-management' ? 'text-[#00236f] font-bold' : 'text-[#505f76]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={currentScreen === 'user-management' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              manage_accounts
            </span>
            <span className="text-[11px]">کاربران</span>
          </button>
        </nav>
      </div>

      {/* Global Modals */}
      <NewReportModal
        isOpen={isNewReportOpen}
        onClose={() => setIsNewReportOpen(false)}
        onSubmit={handleSubmitNewReport}
      />

      <ReportDetailsModal
        report={selectedReportDetails}
        isOpen={!!selectedReportDetails}
        onClose={() => setSelectedReportDetails(null)}
        onApprove={handleApproveReport}
        onReject={handleRejectReport}
      />

      <UserDetailsModal
        user={selectedUserDetails}
        isOpen={!!selectedUserDetails}
        reports={reports}
        onClose={() => setSelectedUserDetails(null)}
        onViewReportDetails={(rep) => {
          setSelectedUserDetails(null);
          setSelectedReportDetails(rep);
        }}
      />

      <UserDetailsModal
        allUsersModal={true}
        users={users}
        isOpen={isAllUsersModalOpen}
        reports={reports}
        onClose={() => setIsAllUsersModalOpen(false)}
        onSelectUser={(u) => {
          setIsAllUsersModalOpen(false);
          setSelectedUserDetails(u);
        }}
        onViewReportDetails={(rep) => {
          setIsAllUsersModalOpen(false);
          setSelectedReportDetails(rep);
        }}
      />

      <HelpCenterModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
