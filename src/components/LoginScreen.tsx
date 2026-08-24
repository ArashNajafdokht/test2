import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin@enterprise.ir');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(username);
    }, 450);
  };

  const handleSSOLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('sso.user@enterprise.ir');
    }, 450);
  };

  return (
    <div className="bg-[#f7f9fb] min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-['Vazirmatn',sans-serif]">
      {/* Subtle Background Glows matching design */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#d0e1fb] blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#dce1ff] blur-3xl opacity-30"></div>
      </div>

      {/* Main Login Card */}
      <main
        id="login-main-card"
        className="w-full max-w-md bg-white border border-[#c5c5d3] rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(30,58,138,0.08)] z-10"
      >
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#1e3a8a] text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <span className="material-symbols-outlined text-4xl" data-icon="work">
              work
            </span>
          </div>
          <h1 className="text-[30px] font-bold text-[#00236f] text-center tracking-tight">
            WorkLog Pro
          </h1>
          <p className="text-[14.5px] text-[#444651] mt-2 text-center">
            ورود به سیستم مدیریت گزارش‌ها
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-[13px] font-semibold text-[#191c1e] mb-2"
            >
              نام کاربری
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="material-symbols-outlined text-[#757682] text-[20px]" data-icon="person">
                  person
                </span>
              </span>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کاربری خود را وارد کنید"
                required
                className="w-full bg-[#F1F5F9] border-2 border-transparent focus:bg-white focus:border-[#00236f] text-[#191c1e] text-[14px] rounded-lg py-3 pr-10 pl-4 transition-colors outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-[13px] font-semibold text-[#191c1e] mb-2"
            >
              رمز عبور
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="material-symbols-outlined text-[#757682] text-[20px]" data-icon="lock">
                  lock
                </span>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                required
                className="w-full bg-[#F1F5F9] border-2 border-transparent focus:bg-white focus:border-[#00236f] text-[#191c1e] text-[14px] rounded-lg py-3 pr-10 pl-4 transition-colors outline-none"
              />
            </div>
            <div className="flex justify-end mt-2">
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('جهت بازیابی رمز عبور با واحد پشتیبانی و زیرساخت تماس حاصل فرمایید.');
                }}
                className="text-[13px] text-[#00236f] hover:text-[#264191] transition-colors"
              >
                فراموشی رمز عبور؟
              </a>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#00236f] bg-white border-[#c5c5d3] rounded focus:ring-[#00236f] focus:ring-2 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-[13.5px] text-[#444651] cursor-pointer select-none"
            >
              مرا به خاطر بسپار
            </label>
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00236f] text-white text-[15px] font-semibold rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-[#264191] transition-all duration-200 active:scale-[0.98] mt-6 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <span>در حال ورود...</span>
            ) : (
              <>
                <span>ورود</span>
                <span className="material-symbols-outlined text-[20px]" data-icon="login">
                  login
                </span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mt-8 mb-6 flex items-center">
          <div className="flex-grow border-t border-[#c5c5d3]"></div>
          <span className="flex-shrink-0 mx-4 text-[13px] text-[#757682]">یا</span>
          <div className="flex-grow border-t border-[#c5c5d3]"></div>
        </div>

        {/* SSO Button */}
        <button
          id="login-sso-btn"
          type="button"
          onClick={handleSSOLogin}
          disabled={isLoading}
          className="w-full bg-white border border-[#00236f] text-[#00236f] text-[14px] font-medium rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-[#d0e1fb]/40 transition-colors duration-200 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="domain">
            domain
          </span>
          <span>ورود با حساب سازمانی (SSO)</span>
        </button>
      </main>
    </div>
  );
};
