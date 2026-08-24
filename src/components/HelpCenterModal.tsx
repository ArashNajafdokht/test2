import React from 'react';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Vazirmatn',sans-serif]">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#00236f] text-[24px]">help</span>
            <h3 className="text-[17px] font-bold text-[#191c1e]">راهنمای سامانه WorkLog Pro</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#505f76] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-right max-h-[70vh] overflow-y-auto text-sm leading-relaxed">
          <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
            <h4 className="font-bold text-[#00236f] text-xs mb-1">۱. نحوه ثبت گزارش روزانه</h4>
            <p className="text-xs text-[#444651]">
              از طریق منوی «Daily Reports» یا دکمه «Create New Report» فرم ثبت وظایف روزانه، ساعت کارکرد و پیوست مستندات را تکمیل و ارسال فرمایید.
            </p>
          </div>

          <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
            <h4 className="font-bold text-[#00236f] text-xs mb-1">۲. تایید یا رد گزارشات توسط مدیر</h4>
            <p className="text-xs text-[#444651]">
              مدیران سیستم در صفحه «Dashboard» و «User Management» می‌توانند گزارش‌های در انتظار را با دکمه سبز (تایید) یا قرمز (رد) بررسی کنند.
            </p>
          </div>

          <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
            <h4 className="font-bold text-[#00236f] text-xs mb-1">۳. آرشیو و صدور خروجی اکسل</h4>
            <p className="text-xs text-[#444651]">
              در صفحه «Archive» امکان جستجوی تمام متون، فیلتر بر اساس وضعیت و دریافت فایل خروجی CSV برای گزارش‌گیری دوره‌ای فراهم شده است.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#00236f] text-white text-xs font-semibold rounded-lg hover:bg-[#1e3a8a] cursor-pointer"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
};
