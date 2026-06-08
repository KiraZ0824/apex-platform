import { LayoutDashboard, Briefcase, BookOpen, User } from 'lucide-react';
import type { TabType } from '../MobileApp';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  copy: Record<string, string>;
}

const tabs = [
  { id: 'dashboard' as TabType, key: 'dashboard', icon: LayoutDashboard },
  { id: 'invitation_center' as TabType, key: 'invitation_center', icon: Briefcase },
  { id: 'learning' as TabType, key: 'learning', icon: BookOpen },
  { id: 'profile' as TabType, key: 'profile', icon: User },
];

export default function BottomNav({ activeTab, onTabChange, copy }: BottomNavProps) {
  return (
    <nav className="glass-panel rounded-[28px] px-2.5 py-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]">
      <div className="grid grid-cols-4 gap-1.5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-0 rounded-[20px] px-2 py-2.5 transition-all duration-200 ${
                isActive
                  ? 'pill-dark -translate-y-1'
                  : 'text-slate-500 hover:bg-white/50'
              }`}
            >
              <Icon className={`w-[18px] h-[18px] mb-1 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span className={`text-[10px] ${isActive ? 'font-bold text-white' : 'font-medium text-app-muted'}`}>
                {copy[tab.key]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
