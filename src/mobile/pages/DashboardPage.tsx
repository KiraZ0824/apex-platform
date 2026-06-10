import { useState } from 'react';
import { Clock3, CheckCircle2, ListTodo, Circle, BookOpen, FileText, Play } from 'lucide-react';
import type { User, InvitationItem, LearningResource } from '../../types';

interface DashboardPageProps {
  user: User;
  myInvitations: InvitationItem[];
  platformInvitations: InvitationItem[];
  learningResources: LearningResource[];
  copy: any;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  ongoing: { bg: 'bg-blue-50/80', text: 'text-blue-700', dot: 'text-blue-500' },
  pending: { bg: 'bg-amber-50/80', text: 'text-amber-700', dot: 'text-amber-500' },
  completed: { bg: 'bg-emerald-50/80', text: 'text-emerald-700', dot: 'text-emerald-500' },
  cancelled: { bg: 'bg-rose-50/80', text: 'text-rose-600', dot: 'text-rose-500' },
};

const resourceIcons: Record<string, any> = {
  video: Play,
  pdf: FileText,
  template: BookOpen,
  report: BookOpen,
};

export default function DashboardPage({ user, myInvitations, platformInvitations, learningResources, copy }: DashboardPageProps) {
  const ongoingCount = myInvitations.filter(i => i.status === 'ongoing').length;
  const completedCount = myInvitations.filter(i => i.status === 'completed').length;
  const openCount = platformInvitations.filter(inv => inv.status === 'open').length;
  const [tab, setTab] = useState<'my' | 'latest'>('my');

  return (
    <div className="px-4 pb-8 space-y-4">

      <section>
        <h2 className="text-[13px] font-medium text-slate-900 mb-2.5">{copy.knowledgeBase}</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          {learningResources.slice(0, 5).map(r => {
            const Icon = resourceIcons[r.type] || BookOpen;
            return (
              <div key={r.id} className="rounded-[10px] bg-white/72 border border-white/80 w-[170px] shrink-0 overflow-hidden">
                <div className="h-[80px] bg-slate-200/70 relative overflow-hidden">
                  {r.cover ? (
                    <img src={r.cover} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 pb-1.5 pt-4">
                    <p className="text-[11px] font-medium text-white leading-4 line-clamp-2">{r.title}</p>
                  </div>
                </div>
                <div className="px-2.5 py-1.5">
                  <p className="text-[8px] text-app-muted">{r.typeLabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-4 gap-2">
          <MiniStat label={copy.ongoing} value={ongoingCount} icon={Clock3} />
          <MiniStat label={copy.completed} value={completedCount} icon={CheckCircle2} />
          <MiniStat label={copy.available} value={openCount} icon={ListTodo} />
          <div className="rounded-[10px] bg-white/82 border border-white/85 p-2">
            <p className="text-[8px] font-semibold text-app-muted mb-0.5">{copy.wisdom}</p>
            <p className="text-[1.1rem] leading-none tracking-[-0.04em] font-bold text-slate-900">{user.points.toLocaleString()}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[12px] bg-white/72 border border-white/80 overflow-hidden">
        <div className="flex">
          <button
            onClick={() => setTab('my')}
            className={`flex-1 py-2.5 text-[10px] font-medium transition-all text-center ${
              tab === 'my' ? 'bg-[#17171b] text-white' : 'text-app-muted'
            }`}
          >
            {copy.myInvites}
          </button>
          <button
            onClick={() => setTab('latest')}
            className={`flex-1 py-2.5 text-[10px] font-medium transition-all text-center ${
              tab === 'latest' ? 'bg-[#17171b] text-white' : 'text-app-muted'
            }`}
          >
            {copy.latestInvites}
          </button>
        </div>

        <div className="px-3 py-2 space-y-1.5">
          {tab === 'my' && myInvitations.slice(0, 5).map(inv => {
            const style = statusStyles[inv.status] || statusStyles.pending;
            return (
              <div key={inv.id} className="rounded-[8px] bg-white/60 border border-white/70 px-2.5 py-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <Circle className={`w-1.5 h-1.5 fill-current ${style.dot}`} />
                      <span className={`text-[7px] px-1.5 py-0.5 rounded-full ${style.bg} ${style.text}`}>{inv.statusLabel}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-4 font-medium text-slate-900">{inv.title}</p>
                  </div>
                  {inv.points && <span className="text-[9px] font-bold text-app-accent shrink-0">{inv.points}{copy.pointSuffix}</span>}
                </div>
              </div>
            );
          })}
          {tab === 'latest' && platformInvitations.slice(0, 5).map(inv => (
            <div key={inv.id} className="rounded-[8px] bg-white/60 border border-white/70 px-2.5 py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-black/5 text-app-muted">{inv.type}</span>
                <p className="mt-0.5 text-[11px] leading-4 font-medium text-slate-900">{inv.title}</p>
              </div>
              <span className="text-[9px] font-bold text-app-accent shrink-0">{inv.points}{copy.pointSuffix}</span>
            </div>
          ))}
          {(tab === 'my' && myInvitations.length === 0) && (
            <p className="text-[10px] text-app-muted text-center py-4">{copy.emptyPoints}</p>
          )}
          {(tab === 'latest' && platformInvitations.length === 0) && (
            <p className="text-[10px] text-app-muted text-center py-4">{copy.emptyPoints}</p>
          )}
        </div>
      </section>
    </div>
  );
}

function MiniStat({ label, value, icon: Icon }: { label: string; value: string | number; icon: any }) {
  return (
    <div className="rounded-[10px] bg-white/82 border border-white/85 p-2">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[8px] font-semibold text-app-muted">{label}</p>
        <div className="w-4 h-4 rounded-[5px] bg-white/85 text-slate-800 flex items-center justify-center shadow-sm">
          <Icon className="w-2 h-2" />
        </div>
      </div>
      <p className="text-[1.1rem] leading-none tracking-[-0.04em] font-bold text-slate-900">{value}</p>
    </div>
  );
}