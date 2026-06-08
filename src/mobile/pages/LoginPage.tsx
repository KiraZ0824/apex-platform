import { useState } from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Language } from '../i18n';
import { appCopy } from '../i18n';

interface LoginPageProps {
  lang: Language;
  onToggleLang: () => void;
}

export default function LoginPage({ lang, onToggleLang }: LoginPageProps) {
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
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
      <div className="absolute right-[-4rem] top-[2rem] w-56 h-56 rounded-full bg-[radial-gradient(circle,_rgba(255,145,58,0.25)_0%,_transparent_70%)]" />
      <div className="absolute left-[-3rem] bottom-[6rem] w-40 h-40 rounded-full bg-[radial-gradient(circle,_rgba(100,180,255,0.15)_0%,_transparent_70%)]" />

      <div className="relative z-10 w-full max-w-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#17171b] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-slate-900 tracking-[-0.02em]">APEX</span>
          </div>
          <button type="button" onClick={onToggleLang} className="text-[11px] font-medium text-slate-700 hover:text-slate-900 transition-colors">
            {copy.switch}
          </button>
        </div>

        <section className="glass-panel rounded-[28px] p-6">
          <div className="mb-6">
            <h1 className="text-[1.8rem] leading-none tracking-[-0.06em] font-medium text-slate-900">{copy.title}</h1>
            <p className="mt-2 text-[12px] text-app-muted leading-5">{copy.helper}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="text-[10px] font-medium text-app-muted mb-1.5 block">{copy.usernamePlaceholder}</label>
              <div className="rounded-[14px] bg-white/70 border border-white/70 px-3.5 py-2.5 transition-all focus-within:border-slate-300 focus-within:bg-white/90">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  className="w-full bg-transparent text-[14px] outline-none placeholder:text-slate-400 text-slate-900"
                  placeholder={copy.usernamePlaceholder}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-medium text-app-muted">{copy.passwordPlaceholder}</label>
                <span className="text-[9px] text-app-muted cursor-pointer">{copy.forgot}</span>
              </div>
              <div className="rounded-[14px] bg-white/70 border border-white/70 px-3.5 py-2.5 transition-all focus-within:border-slate-300 focus-within:bg-white/90">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full bg-transparent text-[14px] outline-none placeholder:text-slate-400 text-slate-900"
                  placeholder="········"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-[14px] bg-rose-50/90 border border-rose-200/60 px-3.5 py-2.5 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="text-[11px] text-rose-600 font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="pill-dark w-full py-3 rounded-[14px] text-sm font-bold tracking-[-0.01em] transition-transform active:scale-[0.98]"
            >
              {lang === 'zh' ? '登录' : 'Log in'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}