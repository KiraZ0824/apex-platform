import { useState } from 'react';
import { Clock3, CheckCircle2, ListTodo, Circle, BookOpen, FileText, Play, Coins } from 'lucide-react';
import type { User, InvitationItem, Invitation, LearningResource } from '../../types';

interface DashboardPageProps {
  user: User;
  myInvitations: InvitationItem[];
  platformInvitations: InvitationItem[];
  learningResources: LearningResource[];
  invitations: Invitation[];
  copy: any;
  onSelect: (id: string) => void;
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

export default function DashboardPage({ user, myInvitations, platformInvitations, learningResources, invitations, copy, onSelect }: DashboardPageProps) {
  const ongoingCount = myInvitations.filter(i => i.status === 'ongoing').length;
  const completedCount = myInvitations.filter(i => i.status === 'completed').length;
  const openCount = platformInvitations.filter(inv => inv.status === 'open').length;
  const [tab, setTab] = useState<'my' | 'latest'>('my');

  return (
    <div className="px-4 pb-8 space-y-4">

      <section className="-mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {learningResources.slice(0, 5).map(r => {
            const Icon = resourceIcons[r.type] || BookOpen;
            return (
              <div key={r.id} className="rounded-[10px] bg-white/72 border border-white/80 w-[170px] shrink-0 overflow-hidden">
                <div className="h-[140px] bg-slate-200/70 relative overflow-hidden">
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
        <div className="flex gap-1.5">
          <StatCard label={copy.ongoing} value={ongoingCount} icon={Clock3} color="blue" wide />
          <StatCard label={copy.completed} value={completedCount} icon={CheckCircle2} color="emerald" />
          <StatCard label={copy.available} value={openCount} icon={ListTodo} color="amber" />
          <StatCard label={copy.wisdom} value={user.points.toLocaleString()} icon={Coins} color="dark" wide />
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
            const matchedInv = invitations.find(i => i.title === inv.title);
            return (
              <div
                key={inv.id}
                onClick={() => matchedInv && onSelect(matchedInv.id)}
                className={`rounded-[8px] bg-white/60 border border-white/70 px-2.5 py-2 ${matchedInv ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
              >
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
          {tab === 'latest' && platformInvitations.slice(0, 5).map(inv => {
            const matchedInv = invitations.find(i => i.title === inv.title);
            return (
              <div
                key={inv.id}
                onClick={() => matchedInv && onSelect(matchedInv.id)}
                className={`rounded-[8px] bg-white/60 border border-white/70 px-2.5 py-2 flex items-center justify-between gap-3 ${matchedInv ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
              >
                <div className="min-w-0">
                  <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-black/5 text-app-muted">{inv.type}</span>
                  <p className="mt-0.5 text-[11px] leading-4 font-medium text-slate-900">{inv.title}</p>
                </div>
                <span className="text-[9px] font-bold text-app-accent shrink-0">{inv.points}{copy.pointSuffix}</span>
              </div>
            );
          })}
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

function StatCard({ label, value, icon: Icon, color, wide }: { label: string; value: string | number; icon: any; color: 'blue' | 'emerald' | 'amber' | 'dark'; wide?: boolean }) {
  const colorStyles: Record<string, { bar: string; iconBg: string; iconColor: string; bg: string; textColor: string; accentText: string }> = {
    blue: { bar: 'bg-blue-500/30', iconBg: 'bg-blue-100/80', iconColor: 'text-blue-600', bg: 'bg-white/82', textColor: 'text-blue-900', accentText: 'text-blue-700' },
    emerald: { bar: 'bg-emerald-500/30', iconBg: 'bg-emerald-100/80', iconColor: 'text-emerald-600', bg: 'bg-white/82', textColor: 'text-emerald-900', accentText: 'text-emerald-700' },
    amber: { bar: 'bg-amber-500/30', iconBg: 'bg-amber-100/80', iconColor: 'text-amber-600', bg: 'bg-white/82', textColor: 'text-amber-900', accentText: 'text-amber-700' },
    dark: { bar: 'bg-black/20', iconBg: 'bg-[#17171b]', iconColor: 'text-white', bg: 'bg-[#17171b]/90', textColor: 'text-white', accentText: 'text-white/70' },
  };
  const s = colorStyles[color];

  return (
    <div className={`${wide ? 'flex-[3]' : 'flex-[2]'} ${s.bg} border border-white/85 rounded-[10px] p-2.5 relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 right-0 h-[2.5px] ${s.bar}`} />
      <div className="flex items-start justify-between mb-0.5">
        <p className={`text-[8px] font-semibold ${s.accentText}`}>{label}</p>
        <div className={`w-4.5 h-4.5 rounded-[5px] ${s.iconBg} ${s.iconColor} flex items-center justify-center`}>
          <Icon className="w-2.5 h-2.5" />
        </div>
      </div>
      <p className={`text-[1.1rem] leading-none tracking-[-0.04em] font-bold ${s.textColor}`}>{value}</p>
    </div>
  );
}