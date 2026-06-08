import { useState } from 'react';
import { BookOpen, Clock, Play, FileText, FileSpreadsheet, BarChart, Download, CheckCircle } from 'lucide-react';
import type { LearningResource } from '../../types';

interface LearningPageProps {
  resources: LearningResource[];
  copy: any;
}

const typeIcons: Record<string, any> = {
  video: Play,
  pdf: FileText,
  template: FileSpreadsheet,
  report: BarChart,
};

const typeColors: Record<string, string> = {
  video: 'bg-blue-50 text-blue-500',
  pdf: 'bg-red-50 text-red-500',
  template: 'bg-amber-50 text-amber-500',
  report: 'bg-purple-50 text-purple-500',
};

export default function LearningPage({ resources, copy }: LearningPageProps) {
  const [activeCategory, setActiveCategory] = useState(copy.categories?.['新手必读'] || '新手必读');

  const completedCount = resources.filter(r => r.completed).length;
  const filtered = resources.filter(r => {
    const catKey = Object.keys(copy.categories).find(k => copy.categories[k] === activeCategory) || activeCategory;
    return r.category === catKey;
  });

  const categories = Object.values(copy.categories) as string[];

  return (
    <div className="px-4 pb-8 space-y-4">
      <section className="grid grid-cols-2 gap-2.5">
        <MetricCard icon={BookOpen} label={copy.completedCourses} value={`${completedCount}`} />
        <MetricCard icon={Clock} label={copy.hours} value="12.5h" />
      </section>

      <section className="glass-panel rounded-[28px] p-4">
        <h1 className="text-[1.6rem] leading-none tracking-[-0.05em] font-medium text-slate-900">
          {copy.titleTop} {copy.titleBottom}
        </h1>

        <div className="mt-4 flex bg-white/56 rounded-[20px] p-1 border border-white/70">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 py-2 text-[11px] font-medium rounded-[16px] transition-all text-center ${
                activeCategory === cat ? 'pill-dark' : 'text-app-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-3">
        {filtered.map(resource => {
          const Icon = typeIcons[resource.type] || FileText;
          const colorClass = typeColors[resource.type] || 'bg-slate-50 text-slate-500';

          return (
            <div key={resource.id} className="glass-panel rounded-[30px] overflow-hidden">
              {resource.type === 'video' ? (
                <>
                  <div className="h-36 bg-[radial-gradient(circle_at_76%_68%,rgba(255,148,55,0.9)_0%,rgba(255,148,55,0.22)_28%,transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.18))] relative flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/82 backdrop-blur-sm flex items-center justify-center shadow-sm">
                      <Play className="w-5 h-5 text-slate-700 ml-0.5" />
                    </div>
                    {resource.duration && (
                      <span className="absolute bottom-3 right-3 pill-dark text-[9px] px-2 py-1 rounded-full">
                        {resource.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${colorClass}`}>{resource.typeLabel}</span>
                      {resource.completed && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <h3 className="text-[1.2rem] leading-6 tracking-[-0.05em] font-medium text-slate-900 mb-2">{resource.title}</h3>
                    <p className="text-[12px] text-app-muted line-clamp-2 leading-5">{resource.description}</p>
                    <div className="flex items-center justify-between mt-4 text-[10px] text-app-soft">
                      <span>{resource.views} {copy.views}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-11 h-11 rounded-[18px] ${colorClass} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${colorClass}`}>{resource.typeLabel}</span>
                      <h3 className="text-[1.15rem] leading-6 tracking-[-0.05em] font-medium text-slate-900 mt-2">{resource.title}</h3>
                    </div>
                  </div>
                  <p className="text-[12px] text-app-muted line-clamp-2 leading-5 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between text-[10px] text-app-soft pt-3 border-t soft-divider">
                    {resource.views && <span>{resource.views} {copy.reads}</span>}
                    {resource.downloads && (
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.downloads} {copy.downloads}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-400">{copy.empty}</div>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: any;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-[24px] bg-white/58 border border-white/70 p-3.5">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 ${accent ? 'bg-[#17171b] text-white' : 'bg-white/70 text-slate-700'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-[10px] text-app-muted">{label}</p>
      <p className="mt-1 text-[1.1rem] leading-none tracking-[-0.05em] font-medium text-slate-900">{value}</p>
    </div>
  );
}
