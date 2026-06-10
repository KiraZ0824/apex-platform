import { ChevronLeft, Clock, Users, Calendar, Award, CheckSquare } from 'lucide-react';
import { Invitation } from '../../types';

interface InvitationDetailPageProps {
  invitation: Invitation;
  copy: any;
  onBack: () => void;
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-[16px] bg-white/62 border border-white/70 px-3.5 py-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3 h-3 text-app-soft" />
        <p className="text-[9px] text-app-muted">{label}</p>
      </div>
      <p className="text-[13px] font-medium text-slate-900">{value}</p>
    </div>
  );
}

export default function InvitationDetailPage({ invitation, copy, onBack }: InvitationDetailPageProps) {
  const inv = invitation;

  return (
    <div className="px-4 pb-8 space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-[11px] text-app-muted font-medium">
        <ChevronLeft className="w-3.5 h-3.5" />
        {copy.back}
      </button>

      <section className="glass-panel-strong rounded-[28px] p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50/80 text-emerald-700 font-medium">{copy.openStatus}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-app-muted">{inv.typeLabel}</span>
        </div>
        <h1 className="text-[1.4rem] leading-7 tracking-[-0.05em] font-medium text-slate-900">{inv.title}</h1>
        <p className="mt-2 text-[11px] text-app-muted leading-5">{inv.description}</p>
      </section>

      <section>
        <h2 className="text-[11px] font-medium text-app-muted mb-2.5 px-1">{copy.detail}</h2>
        <div className="glass-panel rounded-[24px] p-4">
          <p className="text-[12px] text-slate-800 leading-6">{inv.detail}</p>
        </div>
      </section>

      {inv.acceptanceCriteria && (
        <section>
          <h2 className="text-[11px] font-medium text-app-muted mb-2.5 px-1">{copy.acceptance}</h2>
          <div className="glass-panel rounded-[24px] p-3.5">
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-app-accent shrink-0 mt-0.5" />
              <p className="text-[12px] text-slate-800 leading-5">{inv.acceptanceCriteria}</p>
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-2 gap-2.5">
        <DetailRow icon={Award} label={copy.wisdomVal} value={`${inv.points}pt`} />
        <DetailRow icon={Users} label={copy.registered} value={inv.registeredCount != null ? `${inv.registeredCount}${copy.applicantCount.replace('{count}', '')}` : '--'} />
        <DetailRow icon={Calendar} label={copy.regDeadline} value={inv.regDeadline || inv.deadline} />
        <DetailRow icon={Calendar} label={copy.startDate} value={inv.startDate || '--'} />
        <DetailRow icon={Calendar} label={copy.endDate} value={inv.endDate || inv.deadline} />
        <DetailRow icon={Clock} label={copy.deadline} value={inv.deadline} />
      </section>

      {inv.tags && inv.tags.length > 0 && (
        <section>
          <div className="flex flex-wrap gap-1.5">
            {inv.tags.map((tag, idx) => (
              <span key={idx} className="text-[9px] px-2.5 py-1 rounded-full bg-white/60 border border-white/70 text-app-muted">{tag}</span>
            ))}
          </div>
        </section>
      )}

      <button className="w-full py-3.5 rounded-[16px] bg-[#17171b] text-white text-[15px] font-medium tracking-wide transition-all active:scale-[0.98]">
        {copy.apply}
      </button>
    </div>
  );
}