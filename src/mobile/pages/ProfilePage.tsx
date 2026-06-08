import { useState } from 'react';
import { HelpCircle, LogOut, ChevronRight, ChevronLeft, Mail, BookOpen, Globe, Download, DollarSign, Lock } from 'lucide-react';
import type { User } from '../../types';
import type { Language } from '../i18n';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
  copy: any;
  onToggleLang: () => void;
  lang: Language;
}

type SubPage = 'points' | 'security' | 'notifications' | 'records' | 'help' | null;

const mockPointsLog = [
  { time: '2026-04-20 10:23', source: '任务结算 - SaaS 企业 NDR 提升专项', change: '+1,200', type: 'earn' },
  { time: '2026-04-18 15:02', source: '阶段奖励 - 欧洲市场合规策略梳理', change: '+900', type: 'earn' },
  { time: '2026-04-05 09:30', source: '首次注册完善信息奖励', change: '+40', type: 'earn' },
];

const mockExchangeLog = [
  { time: '2026-04-15', orderNo: 'EX-20260415-001', consumed: '5,000', obtained: '5,000', wallet: '0x7a3f...b2e1', status: 'success' },
  { time: '2026-04-10', orderNo: 'EX-20260410-003', consumed: '2,000', obtained: '2,000', wallet: '0x7a3f...b2e1', status: 'success' },
];

export default function ProfilePage({ user, onLogout, copy, onToggleLang, lang }: ProfilePageProps) {
  const [subPage, setSubPage] = useState<SubPage>(null);
  const [pointsTab, setPointsTab] = useState<'log' | 'exchange' | 'settlement'>('log');

  const back = () => setSubPage(null);

  if (subPage) {
    return (
      <div className="px-4 pb-8 space-y-4">
        <button onClick={back} className="flex items-center gap-1.5 text-[11px] text-app-muted mb-1">
          <ChevronLeft className="w-4 h-4" />
          {lang === 'zh' ? '返回' : 'Back'}
        </button>

        {subPage === 'points' && (
          <>
            {renderPointsAsset()}
          </>
        )}

        {subPage === 'security' && (
          <section className="glass-panel rounded-[30px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">{copy.security}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2.5">
                <div>
                  <p className="text-[12px] text-slate-900">{copy.changePassword}</p>
                  <p className="text-[10px] text-app-muted mt-0.5">{copy.passwordHint}</p>
                </div>
                <button className="text-[10px] border border-white/70 px-2.5 py-1.5 rounded-full bg-white/60 text-slate-700">{lang === 'zh' ? '修改' : 'Change'}</button>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-white/60">
                <div>
                  <p className="text-[12px] text-slate-900">{copy.kyc}</p>
                  <p className="text-[10px] text-app-muted mt-0.5">{copy.kycDesc}</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full bg-amber-50/80 text-amber-700 font-medium">
                  {copy.kycPending} <button className="underline">{copy.kycAction}</button>
                </span>
              </div>
            </div>
          </section>
        )}

        {subPage === 'notifications' && (
          <section className="glass-panel rounded-[30px] p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">{copy.notifications}</h3>
            <p className="text-[11px] text-app-muted">{copy.notificationsDesc}</p>
          </section>
        )}

        {subPage === 'records' && (
          <section className="glass-panel rounded-[30px] p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">{copy.records}</h3>
            <p className="text-[11px] text-app-muted">{copy.recordsDesc}</p>
          </section>
        )}

        {subPage === 'help' && (
          <section className="glass-panel rounded-[30px] overflow-hidden">
            <div className="divide-y soft-divider">
              <div className="px-4 py-4 flex items-center justify-between hover:bg-white/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[18px] bg-white/66 border border-white/70 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-slate-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{copy.help}</p>
                    <p className="text-[11px] text-app-muted mt-0.5">{copy.helpDesc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-app-soft" />
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  function renderPointsAsset() {
    return (
      <section className="glass-panel rounded-[30px] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">{copy.pointsAsset}</h3>
          <button className="text-[10px] border border-white/70 px-2.5 py-1.5 rounded-full bg-white/60 text-slate-700 flex items-center gap-1">
            <Download className="w-3 h-3" />{copy.exportBill}
          </button>
        </div>
        <div className="rounded-[24px] bg-white/60 border border-white/70 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="flex-1">
              <p className="text-[10px] text-app-muted mb-1">{copy.availablePoints}</p>
              <p className="text-[1.8rem] font-bold text-slate-900 tracking-[-0.04em]">{user.points.toLocaleString()}</p>
              <p className="text-[9px] text-app-soft mt-1">{copy.pointsRate}</p>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-app-muted mb-1">{copy.walletAddress}</p>
              <p className="text-[12px] text-slate-700 font-mono">{copy.walletUnbound}</p>
              <button className="text-[10px] text-app-accent hover:underline mt-0.5">{copy.bindWallet}</button>
            </div>
            <div className="flex-none">
              <button className="pill-dark rounded-full px-5 py-2.5 text-[11px] font-medium flex items-center gap-1.5 opacity-70">
                <DollarSign className="w-3.5 h-3.5" />{copy.exchangeStable}
              </button>
              <p className="text-[9px] text-amber-600 mt-1 text-center">{copy.comingSoon}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-4 border-b border-white/60 mb-4">
            {['log', 'exchange', 'settlement'].map(key => {
              const labels: Record<string, string> = { log: copy.pointsLog, exchange: copy.exchangeLog, settlement: copy.settlementLog };
              return (
                <button
                  key={key}
                  onClick={() => setPointsTab(key as any)}
                  className={`pb-2.5 text-[11px] font-semibold border-b-2 transition-colors ${
                    pointsTab === key ? 'text-slate-900 border-slate-900' : 'text-app-muted border-transparent'
                  }`}
                >
                  {labels[key]}
                </button>
              );
            })}
          </div>

          {pointsTab === 'log' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] font-semibold text-app-soft uppercase tracking-wider">{copy.allRecords}</p>
              </div>
              {mockPointsLog.map((item, i) => (
                <div key={i} className="rounded-[18px] bg-white/60 border border-white/70 px-3 py-2.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] text-app-muted">{item.time}</p>
                    <p className="text-[11px] font-medium text-slate-900 truncate mt-0.5">{item.source}</p>
                  </div>
                  <span className={`text-[12px] font-bold shrink-0 ml-3 ${item.type === 'earn' ? 'text-emerald-600' : 'text-rose-600'}`}>{item.change}</span>
                </div>
              ))}
            </div>
          )}

          {pointsTab === 'exchange' && (
            <div className="space-y-2.5">
              {mockExchangeLog.map((item, i) => (
                <div key={i} className="rounded-[18px] bg-white/60 border border-white/70 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] text-app-muted">{item.time}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.status === 'success' ? 'bg-emerald-50/80 text-emerald-700' : 'bg-amber-50/80 text-amber-700'
                    }`}>{item.status === 'success' ? copy.success : copy.processing}</span>
                  </div>
                  <p className="text-[10px] text-app-muted">{copy.orderNo}: {item.orderNo}</p>
                  <div className="flex items-center justify-between mt-1.5 text-[11px]">
                    <span className="text-slate-500">{copy.consumed}: <span className="font-bold text-slate-900">{item.consumed}</span></span>
                    <span className="text-slate-500">{copy.obtained}: <span className="font-bold text-emerald-600">{item.obtained}</span></span>
                  </div>
                  <p className="text-[9px] text-app-soft mt-1">{copy.walletAddr}: {item.wallet}</p>
                </div>
              ))}
            </div>
          )}

          {pointsTab === 'settlement' && (
            <div className="text-center py-6 text-[11px] text-app-muted">{lang === 'zh' ? '暂无结算记录' : 'No settlement records yet'}</div>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="px-4 pb-8 space-y-4">
      <section className="glass-panel-strong rounded-[34px] p-5 relative overflow-hidden">
        <div className="absolute right-[-3rem] top-[4rem] w-40 h-40 rounded-full bg-[radial-gradient(circle,_rgba(255,145,58,0.9)_0%,_rgba(255,145,58,0.22)_35%,_transparent_72%)] blur-md" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full border border-white/70 overflow-hidden bg-[#17171b] text-white flex items-center justify-center text-xl font-black shrink-0">
              {user.username.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[1.4rem] leading-none tracking-[-0.06em] font-medium text-slate-900">{user.username}</h2>
              <p className="text-[10px] text-app-muted mt-1.5">zhuanz@example.com</p>
            </div>
            <button className="text-[10px] text-app-accent font-medium hover:underline shrink-0">{lang === 'zh' ? '编辑' : 'Edit'}</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-app-muted">{copy.phone}:</span>
            <span className="text-[11px] text-slate-900">+86 138****8888</span>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[30px] overflow-hidden">
        <div className="divide-y soft-divider">
          <MenuItem icon={DollarSign} label={copy.pointsAsset} desc={`${user.points.toLocaleString()} ${lang === 'zh' ? '智慧值' : 'points'}`} onClick={() => setSubPage('points')} />
          <MenuItem icon={Lock} label={copy.security} desc={lang === 'zh' ? '密码、KYC 认证' : 'Password, KYC'} onClick={() => setSubPage('security')} />
          <MenuItem icon={Mail} label={copy.notifications} desc={copy.notificationsDesc} onClick={() => setSubPage('notifications')} />
          <MenuItem icon={BookOpen} label={copy.records} desc={copy.recordsDesc} onClick={() => setSubPage('records')} />
          <LanguageMenuItem icon={Globe} label={copy.settings} lang={lang} onToggleLang={onToggleLang} />
          <MenuItem icon={HelpCircle} label={copy.help} desc={copy.helpDesc} onClick={() => setSubPage('help')} />
        </div>
      </section>

      <button
        onClick={onLogout}
        className="pill-dark w-full py-4 text-sm font-bold rounded-[28px] transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        {copy.logout}
      </button>
    </div>
  );
}

function MenuItem({ icon: Icon, label, desc, onClick }: { icon: any; label: string; desc: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className="px-4 py-4 flex items-center justify-between hover:bg-white/30 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[18px] bg-white/66 border border-white/70 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-800" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
          <p className="text-[11px] text-app-muted mt-0.5">{desc}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-app-soft" />
    </div>
  );
}

function LanguageMenuItem({ icon: Icon, label, lang, onToggleLang }: { icon: any; label: string; lang: Language; onToggleLang: () => void }) {
  return (
    <div onClick={onToggleLang} className="px-4 py-4 flex items-center justify-between hover:bg-white/30 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[18px] bg-white/66 border border-white/70 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-800" />
        </div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
      </div>
      <span className="text-[11px] font-bold text-slate-800">{lang === 'zh' ? 'EN' : '中文'}</span>
    </div>
  );
}