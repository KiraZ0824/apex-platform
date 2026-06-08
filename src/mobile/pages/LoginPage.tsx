import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full space-y-4">
        <div className="grid grid-cols-[1.05fr_0.95fr] gap-3 items-stretch">
          <section className="glass-panel rounded-[34px] px-5 pt-5 pb-6">
            <div className="flex items-center justify-between mb-7">
              <span className="text-[11px] text-app-muted">{copy.brand}</span>
              <button type="button" onClick={onToggleLang} className="text-[11px] font-medium text-slate-900">{copy.switch}</button>
            </div>
            <div className="mb-6">
              <p className="text-[2rem] leading-none tracking-[-0.06em] font-medium text-slate-900">{copy.title}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="soft-input rounded-full px-4 py-3">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder={copy.usernamePlaceholder}
                />
              </div>

              <div className="soft-input rounded-full px-4 py-3 flex items-center gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder={copy.passwordPlaceholder}
                />
                <button type="button" className="bg-white rounded-full px-3 py-1 text-[10px] text-app-muted">
                  {copy.forgot}
                </button>
              </div>

              {error && (
                <div className="rounded-[20px] bg-rose-50/80 border border-rose-100 px-4 py-3 flex items-center text-rose-600 text-sm font-medium">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <p className="max-w-[12rem] text-[10px] leading-4 text-app-soft">
                  {copy.helper}
                </p>
                <button
                  type="submit"
                  className="pill-dark w-11 h-11 rounded-full flex items-center justify-center text-lg transition-transform active:scale-95"
                >
                  →
                </button>
              </div>
            </form>
          </section>

          <section className="glass-panel-strong rounded-[34px] p-4 relative overflow-hidden">
            <div className="absolute inset-y-3 left-3 w-[38%] rounded-[26px] bg-white/72 backdrop-blur-xl border border-white/60" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="pl-3">
                  <div className="hero-digit text-slate-900">Thu</div>
                  <div className="text-[2.4rem] leading-none tracking-[-0.08em] text-black/18 font-medium">24th</div>
                </div>
                <div className="text-right text-[11px] leading-4 text-app-muted pt-1">
                  {copy.showcaseNoteTop}
                  <br />
                  {copy.showcaseNoteBottom}
                </div>
              </div>
              <div className="px-3 pb-1">
                <p className="text-[12px] leading-5 text-app-muted">
                  18 PM
                  <br />
                  Kerkstraat 12B
                  <br />
                  Amsterdam
                </p>
              </div>
              <div className="flex items-end justify-between px-3">
                <span className="text-[12px] tracking-tight text-slate-900">Apex</span>
                <button type="button" className="pill-dark rounded-full px-4 py-2 text-[11px] font-medium">
                  {copy.joinIn}
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="pill-dark rounded-[28px] px-5 py-4 flex items-end justify-between">
          <div>
            <p className="text-[2rem] leading-none tracking-[-0.06em] font-medium text-white">{copy.newIn}</p>
            <p className="text-sm text-white/58 mt-1">{copy.apexMobile}</p>
          </div>
          <button type="button" className="text-sm text-white/90">{copy.discover}</button>
        </div>
      </div>
    </div>
  );
}
