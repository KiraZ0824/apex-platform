import { useState } from 'react';
import { Clock3, CheckCircle2, ListTodo, Coins, Circle } from 'lucide-react';
import type { User, InvitationItem, Activity } from '../../types';

interface DashboardPageProps {
  user: User;
  myInvitations: InvitationItem[];
  platformInvitations: InvitationItem[];
  activities: Activity[];
  copy: any;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  ongoing: { bg: 'bg-blue-50/80', text: 'text-blue-700', dot: 'text-blue-500' },
  pending: { bg: 'bg-amber-50/80', text: 'text-amber-700', dot: 'text-amber-500' },
  completed: { bg: 'bg-emerald-50/80', text: 'text-emerald-700', dot: 'text-emerald-500' },
  cancelled: { bg: 'bg-rose-50/80', text: 'text-rose-600', dot: 'text-rose-500' },
};

const mockNews = [
  { id: '1', title: '2026 APEX Partner Summit 即将在硅谷举办', tag: '活动', time: '2026-04-22' },
  { id: '2', title: 'Web3 合规审计新规解读：企业如何应对', tag: '行业', time: '2026-04-20' },
  { id: '3', title: 'APEX 平台升级 v3.2 — 特邀功能全面优化', tag: '公告', time: '2026-04-18' },
  { id: '4', title: '上海跨境支付创新论坛报名开启', tag: '活动', time: '2026-04-16' },
  { id: '5', title: '央行数字货币跨境结算试点扩大至 12 国', tag: '政策', time: '2026-04-14' },
  { id: '6', title: 'AI 辅助合规审查工具正式上线企业版', tag: '产品', time: '2026-04-12' },
  { id: '7', title: '新加坡金融管理局发布数字银行最新监管框架', tag: '行业', time: '2026-04-10' },
  { id: '8', title: 'APEX 与三家国际律所达成合规战略合作', tag: '公告', time: '2026-04-08' },
];

export default function DashboardPage({ user, myInvitations, platformInvitations, activities, copy }: DashboardPageProps) {
  const ongoingCount = myInvitations.filter(i => i.status === 'ongoing').length;
  const completedCount = myInvitations.filter(i => i.status === 'completed').length;
  const openCount = platformInvitations.filter(inv => inv.status === 'open').length;
  const [dashboardTab, setDashboardTab] = useState('my-invites');

  const tabs = [
    { key: 'my-invites', label: copy.myInvites },
    { key: 'fresh', label: copy.fresh },
  ];

  return (
    <div className="px-4 pb-8 space-y-4">
      <section className="px-1 pt-1">
        <h1 className="text-[1.7rem] leading-none tracking-[-0.05em] font-bold text-slate-900">
          {copy.hello}
        </h1>
        <p className="mt-2.5 text-[12px] text-app-muted leading-5 tracking-[-0.01em]">{copy.welcome}</p>
      </section>

      <section className="glass-panel-strong rounded-[28px] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(75,47,28,0.08)]">
        <div className="grid grid-cols-4 gap-1.5">
          <StatCard
            label={copy.ongoing}
            value={ongoingCount}
            icon={Clock3}
            subLabel={copy.myInvitesShort}
            accentBg="bg-[radial-gradient(ellipse_at_30%_24%,rgba(255,200,140,0.28),transparent_64%)]"
          />
          <StatCard
            label={copy.completed}
            value={completedCount}
            icon={CheckCircle2}
            subLabel={copy.historyTotal}
            accentBg="bg-[radial-gradient(ellipse_at_66%_20%,rgba(160,220,160,0.22),transparent_60%)]"
          />
          <StatCard
            label={copy.available}
            value={openCount}
            icon={ListTodo}
            subLabel={copy.platformOpen}
            accentBg="bg-[radial-gradient(ellipse_at_34%_22%,rgba(148,196,255,0.20),transparent_62%)]"
          />
          <div className="rounded-[16px] bg-white/82 border-2 border-white/85 p-1.5 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.95),0_4px_12px_rgba(255,140,50,0.08)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,200,130,0.30),transparent_60%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-[10px] font-semibold tracking-tight text-app-muted">{copy.wisdom}</p>
                <div className="w-6 h-6 rounded-full bg-[#17171b] text-white flex items-center justify-center">
                  <Coins className="w-3 h-3" />
                </div>
              </div>
              <p className="text-[1.65rem] leading-[1.1] tracking-[-0.06em] font-bold text-slate-900">{user.points.toLocaleString()}</p>
              <p className="mt-0.5 text-[10px] font-medium text-app-soft">{copy.totalWisdom}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] overflow-hidden">
        <div className="flex bg-white/56 border-b border-white/70">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setDashboardTab(tab.key)}
              className={`flex-1 py-2.5 text-[10px] font-medium transition-all text-center ${
                dashboardTab === tab.key ? 'pill-dark rounded-none' : 'text-app-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-3 py-2.5">
          {dashboardTab === 'my-invites' && (
            <div className="space-y-1.5">
              {myInvitations.slice(0, 3).map(inv => {
                const style = statusStyles[inv.status] || statusStyles.pending;
                return (
                  <div key={inv.id} className="rounded-[16px] bg-white/60 border border-white/70 px-2.5 py-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <Circle className={`w-1.5 h-1.5 fill-current ${style.dot}`} />
                          <span className={`text-[7px] px-1.5 py-0.5 rounded-full ${style.bg} ${style.text}`}>{inv.statusLabel}</span>
                        </div>
                        <p className="mt-1 text-[11px] leading-4 font-medium text-slate-900">{inv.title}</p>
                      </div>
                      {inv.points && <span className="text-[9px] font-bold text-app-accent shrink-0">{inv.points}{copy.pointSuffix}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {dashboardTab === 'fresh' && (
            <div className="space-y-1.5">
              {platformInvitations.slice(0, 4).map(inv => (
                <div key={inv.id} className="rounded-[16px] bg-white/60 border border-white/70 px-2.5 py-1.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-black/5 text-app-muted">{inv.type}</span>
                    <p className="mt-0.5 text-[11px] leading-4 font-medium text-slate-900">{inv.title}</p>
                  </div>
                  <span className="text-[9px] font-bold text-app-accent shrink-0">{inv.points}{copy.pointSuffix}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="glass-panel rounded-[28px] px-3 py-3">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[1.1rem] leading-none tracking-[-0.04em] font-medium text-slate-900">{copy.recent}</h2>
        </div>
        <div className="space-y-1.5">
          {activities.slice(0, 3).map(a => (
            <div key={a.id} className="rounded-[16px] bg-white/58 border border-white/70 px-2.5 py-1.5 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#15151a] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                {a.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] leading-4 text-slate-900 truncate">
                  <span className="font-bold">{a.user}</span> {a.action}
                </p>
                <p className="text-[9px] text-app-muted truncate">{a.target}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[9px] font-bold text-app-accent">{a.points ? `+${a.points}` : copy.emptyPoints}</p>
                <p className="text-[7px] text-app-soft">{a.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[28px] px-3 py-3">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[1.1rem] leading-none tracking-[-0.04em] font-medium text-slate-900">{copy.news}</h2>
        </div>
        <div className="space-y-1.5">
          {mockNews.slice(0, 4).map(item => (
            <div key={item.id} className="rounded-[16px] bg-white/60 border border-white/70 px-2.5 py-1.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-blue-50/80 text-blue-700">{item.tag}</span>
                <span className="text-[7px] text-app-soft">{item.time}</span>
              </div>
              <p className="text-[11px] leading-4 font-medium text-slate-900">{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  subLabel,
  accent = false,
  accentBg = '',
}: {
  label: string;
  value: string | number;
  icon: any;
  subLabel: string;
  accent?: boolean;
  accentBg?: string;
}) {
  return (
    <div className={`rounded-[16px] bg-white/82 border-2 border-white/85 p-1.5 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.95),0_4px_12px_rgba(75,47,28,0.07)] relative overflow-hidden ${accentBg ? '' : ''}`}>
      {accentBg && <div className={`absolute inset-0 ${accentBg}`} />}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-[10px] font-semibold tracking-tight text-app-muted">{label}</p>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${accent ? 'bg-[#17171b] text-white' : 'bg-white/85 text-slate-800 shadow-sm'}`}>
            <Icon className="w-2.5 h-2.5" />
          </div>
        </div>
        <p className="text-[1.65rem] leading-[1.1] tracking-[-0.06em] font-bold text-slate-900">{value}</p>
        <p className="mt-0.5 text-[9px] font-medium text-app-soft">{subLabel}</p>
      </div>
    </div>
  );
}