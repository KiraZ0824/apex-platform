import { useState, useEffect } from 'react';
import { Bot, MessageSquare, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LearningResource, InvitationItem, Invitation, Activity } from '../types';
import { api } from '../services/api';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InvitationCenterPage from './pages/InvitationCenterPage';
import InvitationDetailPage from './pages/InvitationDetailPage';
import LearningPage from './pages/LearningPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/BottomNav';
import { type Language, appCopy } from './i18n';

export type TabType = 'dashboard' | 'invitation_center' | 'learning' | 'profile';

export default function MobileApp() {
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [lang, setLang] = useState<Language>('zh');
  const [searchQuery, setSearchQuery] = useState('');
  const [learningResources, setLearningResources] = useState<LearningResource[]>([]);
  const [myInvitations, setMyInvitations] = useState<InvitationItem[]>([]);
  const [platformInvitations, setPlatformInvitations] = useState<InvitationItem[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null);

  const copy = appCopy[lang];

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const fetchData = async () => {
    if (!user) return;
    try {
      const [lr, mi, pi, i, a] = await Promise.all([
        api.getLearningResources(),
        api.getMyInvitations(),
        api.getPlatformInvitations(),
        api.getInvitations(),
        api.getActivities(),
      ]);
      setLearningResources(lr);
      setMyInvitations(mi);
      setPlatformInvitations(pi);
      setInvitations(i);
      setActivities(a);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center">
        <div className="app-shell w-full max-w-[430px] h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full border-[3px] border-white/70 border-t-orange-400 animate-spin" />
            <p className="text-app-muted text-sm font-medium">{copy.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="app-shell w-full max-w-[430px] min-h-screen">
        <LoginPage lang={lang} onToggleLang={toggleLang} />
      </div>
    </div>
  );

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPage
            user={user}
            myInvitations={myInvitations}
            platformInvitations={platformInvitations}
            activities={activities}
            copy={copy.dashboard}
          />
        );
      case 'invitation_center': {
        const selected = selectedInvitationId
          ? invitations.find(inv => inv.id === selectedInvitationId) || null
          : null;
        if (selected) {
          return (
            <InvitationDetailPage
              invitation={selected}
              copy={copy.invitationCenter}
              onBack={() => setSelectedInvitationId(null)}
            />
          );
        }
        return (
          <InvitationCenterPage
            invitations={invitations}
            copy={copy.invitationCenter}
            onSelect={setSelectedInvitationId}
          />
        );
      }
      case 'learning':
        return (
          <LearningPage resources={learningResources} copy={copy.learning} />
        );
      case 'profile':
        return (
          <ProfilePage user={user} onLogout={logout} copy={copy.profile} onToggleLang={toggleLang} lang={lang} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      <div className="app-shell relative w-full max-w-[430px] h-screen flex flex-col overflow-hidden safe-area shadow-[0_28px_90px_rgba(64,38,17,0.15)]">
        <header className="relative z-10 px-5 pt-4 pb-3 flex items-center justify-between shrink-0 gap-3">
          <span className="text-[1.75rem] font-bold text-slate-900 tracking-[0.28em] shrink-0">APEX</span>
          <div className="flex-1 flex items-center glass-panel rounded-full px-3 py-2 max-w-[180px]">
            <Search className="w-3.5 h-3.5 text-app-soft shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="flex-1 bg-transparent text-[10px] outline-none ml-1.5 placeholder:text-app-soft min-w-0"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/80 border border-white/70 flex items-center justify-center text-slate-700">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#17171b] flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
          </div>
        </header>
        <div className="relative z-10 flex-1 overflow-y-auto pb-28">
          {renderPage()}
        </div>
        <div className="relative z-10 px-4 pb-4">
          <BottomNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            copy={copy.nav}
          />
        </div>
      </div>
    </div>
  );
}
