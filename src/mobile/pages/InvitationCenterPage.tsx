import { useState } from 'react';
import { Mail, Search, List } from 'lucide-react';
import { Invitation } from '../../types';
import { replaceCount } from '../i18n';

interface InvitationCenterPageProps {
  invitations: Invitation[];
  copy: any;
  onSelect: (id: string) => void;
}

export default function InvitationCenterPage({ invitations, copy, onSelect }: InvitationCenterPageProps) {
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
              <div key={invitation.id} onClick={() => onSelect(invitation.id)} className="glass-panel rounded-[24px] p-3.5 cursor-pointer active:scale-[0.98] transition-transform">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50/80 text-emerald-700 font-medium">{copy.openStatus}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-app-muted">{invitation.typeLabel}</span>
                    </div>
                    <h3 className="text-[1rem] leading-5 tracking-[-0.03em] font-medium text-slate-900">{invitation.title}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-bold text-app-accent">{invitation.points}pt</p>
                    <p className="text-[9px] text-app-muted mt-0.5">{invitation.deadline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mt-3">
                  <p className="text-[11px] text-app-muted">{replaceCount(copy.applicantCount, Math.floor(Math.random() * 20) + 3)}</p>
                  <button className="pill-dark text-[11px] px-4 py-2 rounded-full font-medium">
                    {copy.apply}
                  </button>
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
              { title: '跨境支付行业现状授课顾问', status: copy.ongoing, cls: 'bg-blue-50/80 text-blue-700', points: 100 },
              { title: '中国境内支付公司中层管理联系方式获取', status: copy.pendingReview, cls: 'bg-amber-50/80 text-amber-700', points: 10 },
              { title: 'Web3 合约审计安全方案咨询', status: copy.completed, cls: 'bg-emerald-50/80 text-emerald-700', points: 280 },
            ].map((item) => (
              <div key={item.title} className="glass-panel rounded-[22px] p-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium leading-5 text-slate-900">{item.title}</p>
                  <p className="text-[10px] text-app-muted mt-0.5">{copy.autoLinked}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-app-accent">{item.points}pt</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full ${item.cls}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}