import { useState } from 'react';
import { Mail, Calendar, Search, List } from 'lucide-react';
import { Invitation } from '../../types';
import { replaceCount } from '../i18n';

interface InvitationCenterPageProps {
  projects: any[];
  invitations: Invitation[];
  copy: any;
}

const statusColors: Record<string, string> = {
  open: 'bg-slate-300',
  in_progress: 'bg-blue-500',
  completed: 'bg-emerald-500',
  urgent: 'bg-rose-500',
};

const priorityStyles: Record<string, string> = {
  urgent: 'bg-rose-50 text-rose-600',
  high: 'bg-amber-50 text-amber-600',
  medium: 'bg-blue-50 text-blue-600',
  low: 'bg-slate-50 text-slate-600',
};

export default function InvitationCenterPage({ projects: _projects, invitations, copy }: InvitationCenterPageProps) {
  const [tab, setTab] = useState<'invitations' | 'my'>('invitations');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvitations = invitations.filter(inv =>
    inv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.typeLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 pb-8 space-y-4">
      <section className="glass-panel rounded-[28px] p-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[1.6rem] leading-none tracking-[-0.05em] font-medium text-slate-900">
              {copy.titleTop} {copy.titleBottom}
            </h1>
          </div>
        </div>

        <div className="mt-4 flex bg-white/56 rounded-[20px] p-1 border border-white/70">
        {[
          { id: 'invitations' as const, label: copy.invitations, icon: Mail },
          { id: 'my' as const, label: copy.my, icon: List },
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 text-[11px] font-medium rounded-[16px] transition-all flex items-center justify-center ${
                tab === t.id ? 'pill-dark' : 'text-app-muted'
              }`}
            >
              <Icon className="w-3.5 h-3.5 mr-1.5" />
              {t.label}
            </button>
          );
        })}
        </div>
      </section>

      {tab === 'invitations' && (
        <section className="space-y-3">
          <div className="glass-panel rounded-[24px] p-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-app-soft" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="soft-input w-full rounded-full pl-10 pr-3.5 py-2.5 text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-app-muted">{replaceCount(copy.invitationCount, filteredInvitations.length)}</p>
          </div>
          <div className="space-y-2.5">
            {filteredInvitations.map(invitation => (
              <div key={invitation.id} className="glass-panel rounded-[24px] p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${statusColors[invitation.status] || 'bg-slate-300'}`} />
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-app-muted">{invitation.typeLabel}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${(priorityStyles[invitation.priority] || priorityStyles.medium)}`}>
                        {invitation.priority}
                      </span>
                    </div>
                    <h3 className="text-[1rem] leading-5 tracking-[-0.03em] font-medium text-slate-900">{invitation.title}</h3>
                  </div>
                  <span className="text-[13px] font-bold text-app-accent shrink-0">{invitation.points}pt</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="rounded-[16px] bg-white/62 border border-white/70 px-2.5 py-2">
                    <p className="text-[9px] text-app-muted mb-1">{copy.deadline}</p>
                    <div className="flex items-center text-sm font-medium text-slate-900">
                      <Calendar className="w-3 h-3 mr-1.5 text-app-soft" />
                      {invitation.deadline}
                    </div>
                  </div>
                  <div className="rounded-[16px] bg-white/62 border border-white/70 px-2.5 py-2">
                    <p className="text-[9px] text-app-muted mb-1">{copy.matchedTalent}</p>
                    {invitation.talent ? (
                      <div className="flex items-center text-sm font-medium text-slate-900">
                        {invitation.talentAvatar && <img src={invitation.talentAvatar} alt="" className="w-4 h-4 rounded-full mr-1.5" />}
                        {invitation.talent}
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-app-muted">{copy.pendingMatch}</p>
                    )}
                  </div>
                </div>

                {invitation.tags && invitation.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {invitation.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-white/60 border border-white/70 text-app-muted">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'my' && (
        <section className="space-y-3">
          <div className="glass-panel rounded-[24px] p-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-app-soft" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="soft-input w-full rounded-full pl-10 pr-3.5 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { title: '跨境支付行业现状授课顾问', status: copy.ongoing, cls: 'bg-blue-50/80 text-blue-700' },
              { title: '中国境内支付公司中层管理联系方式获取', status: copy.pendingReview, cls: 'bg-amber-50/80 text-amber-700' },
              { title: 'Web3 合约审计安全方案咨询', status: copy.completed, cls: 'bg-emerald-50/80 text-emerald-700' },
            ].map((item) => (
              <div key={item.title} className="glass-panel rounded-[22px] p-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium leading-5 text-slate-900">{item.title}</p>
                  <p className="text-[10px] text-app-muted mt-0.5">{copy.autoLinked}</p>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full shrink-0 ${item.cls}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}