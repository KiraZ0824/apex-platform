import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Language } from '../i18n';
import { appCopy } from '../i18n';

interface LoginPageProps {
  lang: Language;
  onToggleLang: () => void;
}

export default function LoginPage({ lang }: LoginPageProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('Zhuanz');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const copy = appCopy[lang].login;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username);
    if (!success) setError(copy.invalidUser);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-[#0f0f12]">
      <div className="relative z-10 w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-[2rem] leading-none tracking-[-0.04em] font-bold text-white">APEX</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="rounded-[16px] bg-white/8 border border-white/10 px-4 py-3.5 flex items-center gap-3 transition-all focus-within:border-white/20 focus-within:bg-white/12">
            <span className="text-[14px] font-medium text-white/60 shrink-0">{lang === 'zh' ? '账户' : 'Account'}</span>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              className="w-full bg-transparent text-[14px] outline-none text-white placeholder:text-white/30"
              placeholder={lang === 'zh' ? '请输入账户' : 'Enter account'}
            />
          </div>

          <div className="rounded-[16px] bg-white/8 border border-white/10 px-4 py-3.5 transition-all focus-within:border-white/20 focus-within:bg-white/12">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-transparent text-[14px] outline-none text-white placeholder:text-white/30"
              placeholder={lang === 'zh' ? '请输入密码' : 'Enter password'}
            />
          </div>

          {error && (
            <div className="rounded-[14px] bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="text-[11px] text-rose-300 font-medium">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-[16px] bg-white/20 text-white text-[15px] font-medium tracking-wide transition-all active:scale-[0.98] hover:bg-white/25"
          >
            {lang === 'zh' ? '下一步' : 'Next'}
          </button>
        </form>

        <div className="flex items-center justify-center gap-1 text-[11px] text-white/40">
          <span>{lang === 'zh' ? '我已阅读并同意APEX的' : 'I agree to APEX\'s'}</span>
          <span className="text-rose-400 cursor-pointer">{lang === 'zh' ? '《用户协议》' : 'Terms'}</span>
          <span>{lang === 'zh' ? '和' : 'and'}</span>
          <span className="text-rose-400 cursor-pointer">{lang === 'zh' ? '《隐私政策》' : 'Privacy'}</span>
        </div>
      </div>
    </div>
  );
}