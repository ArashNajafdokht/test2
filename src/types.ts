export type ReportStatus = 'approved' | 'pending' | 'rejected';

export type Department = 'توسعه نرم‌افزار' | 'طراحی UI/UX' | 'پشتیبانی فروش' | 'مارکتینگ' | 'مدیریت محصول' | 'زیرساخت و DevOps';

export interface User {
  id: string;
  name: string;
  role: string;
  department: Department;
  email: string;
  avatarUrl: string;
  status: 'active' | 'inactive';
  reportsCount: number;
  totalHours: number;
}

export interface DailyReport {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  department: Department;
  projectName: string;
  taskDescription: string;
  hours: number;
  date: string; // Persian date e.g. "۱۴۰۲/۰۸/۱۵"
  isoDate: string; // e.g. "2023-11-06"
  status: ReportStatus;
  attachmentName?: string;
  attachmentSize?: string;
  reviewerFeedback?: string;
  createdAt: string;
}

export type ScreenType = 
  | 'login'
  | 'dashboard' 
  | 'daily-reports' 
  | 'team-activity' 
  | 'user-management' 
  | 'archive';

export interface CalendarDayInfo {
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  dateStr: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}
