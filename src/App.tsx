import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Award,
  History,
  Bell,
  User as UserIcon,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  LogOut,
  Send,
  X,
  AlertCircle,
  FolderOpen,
  Mail,
  LayoutGrid,
  List,
  Calendar
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useAuth } from './contexts/AuthContext';
import { api } from './services/api';
import { Task, TaskStatus, Activity, UserStats, Submission, Project, Invitation } from './types';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg group ${
      active 
        ? 'bg-primary-50 text-primary-600' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon className={`w-5 h-5 mr-3 ${active ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
    {label}
  </button>
);

const StatCard = ({ label, value, icon: Icon, trend, colorClass }: { label: string, value: string | number, icon: any, trend?: number, colorClass: string }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-xl ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const TaskCard = ({ task, onAction }: { task: Task, onAction: (task: Task) => void }) => {
  const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
    ongoing: { label: '进行中', color: 'bg-blue-100 text-blue-700' },
    completed: { label: '已完成', color: 'bg-emerald-100 text-emerald-700' },
    applying: { label: '报名中', color: 'bg-amber-100 text-amber-700' },
    pending_audit: { label: '待审核', color: 'bg-purple-100 text-purple-700' },
  };

  const { label, color } = statusConfig[task.status];

  return (
    <div className="p-5 bg-white rounded-xl border border-slate-100 hover:border-primary-200 transition-all duration-200 group">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>
          {label}
        </span>
        <button 
          onClick={() => onAction(task)}
          disabled={task.status === 'completed' || task.status === 'pending_audit'}
          className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors ${
            task.status === 'ongoing' ? 'bg-primary-600 text-white hover:bg-primary-700' : 
            task.status === 'applying' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 
            'bg-slate-50 text-slate-300 cursor-not-allowed'
          }`}
        >
          {task.status === 'ongoing' ? '提交任务' : task.status === 'applying' ? '立即报名' : '已锁定'}
        </button>
      </div>
      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
        {task.title}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
        {task.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center text-slate-500 text-xs">
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          截止: {task.deadline}
        </div>
        <div className="flex items-center text-primary-600 font-bold text-sm">
          <Award className="w-4 h-4 mr-1" />
          {task.points} 积分
        </div>
      </div>
    </div>
  );
};

// --- Views ---

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('Zhuanz');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username);
    if (!success) setError('用户不存在，请尝试使用 "Zhuanz" 或 "Auditor_Lee"');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-200">
            <Award className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">RemiCore</h1>
          <p className="text-slate-500 mt-2 font-medium">欢迎回来，请登录您的账户</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">用户名</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
              placeholder="输入用户名..."
            />
            <p className="mt-2 text-xs text-slate-400">试用账号: Zhuanz (Admin), Auditor_Lee (Auditor)</p>
          </div>
          
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center text-rose-600 text-sm font-medium">
              <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5"
          >
            立即登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const { user, loading: authLoading, logout, isAuditor } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState<Task | null>(null);
  const [submitContent, setSubmitContent] = useState('');
  const [projectInvitationTab, setProjectInvitationTab] = useState<'projects' | 'invitations'>('projects');
  const [invitationViewMode, setInvitationViewMode] = useState<'grid' | 'list'>('list');

  const fetchData = async () => {
    if (!user) return;
    try {
      const [t, a, s, sub, p, i] = await Promise.all([
        api.getTasks(),
        api.getActivities(),
        api.getUserStats(user.id),
        api.getSubmissions(),
        api.getProjects(),
        api.getInvitations()
      ]);
      setTasks(t);
      setActivities(a);
      setStats(s);
      setSubmissions(sub);
      setProjects(p);
      setInvitations(i);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleSubmitTask = async () => {
    if (!showSubmitModal || !user) return;
    await api.submitTask({
      taskId: showSubmitModal.id,
      userId: user.id,
      content: submitContent
    });
    setShowSubmitModal(null);
    setSubmitContent('');
    fetchData();
  };

  const handleAudit = async (submissionId: string, status: 'approved' | 'rejected') => {
    if (!user) return;
    await api.auditSubmission(submissionId, user.id, status, status === 'approved' ? '审核通过，积分已发放。' : '提交内容不符合要求，请修改后重试。');
    fetchData();
  };

  if (authLoading) return <div className="h-screen flex items-center justify-center bg-slate-50 font-sans">加载中...</div>;
  if (!user) return <LoginPage />;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 flex items-center">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-primary-200">
            <Award className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">RemiCore</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="个人工作台" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem 
            icon={ClipboardList} 
            label="我的任务" 
            active={activeTab === 'tasks'} 
            onClick={() => setActiveTab('tasks')}
          />
          {isAuditor && (
            <SidebarItem 
              icon={ShieldCheck} 
              label="任务审核" 
              active={activeTab === 'audit'} 
              onClick={() => setActiveTab('audit')}
            />
          )}
          <SidebarItem 
            icon={Award} 
            label="积分排行" 
            active={activeTab === 'leaderboard'} 
            onClick={() => setActiveTab('leaderboard')}
          />
          <SidebarItem 
            icon={History} 
            label="历史记录" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          />
          <SidebarItem 
            icon={FolderOpen} 
            label="项目特邀中心" 
            active={activeTab === 'project_invitation'} 
            onClick={() => setActiveTab('project_invitation')}
          />
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors mb-4"
          >
            <LogOut className="w-5 h-5 mr-3" />
            退出登录
          </button>
          <div className="bg-slate-900 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-110 transition-transform">
              <TrendingUp className="text-white w-12 h-12" />
            </div>
            <p className="text-slate-400 text-xs font-medium mb-1">本月获得积分</p>
            <p className="text-white text-2xl font-bold mb-3">{user.points.toLocaleString()} <span className="text-xs font-normal opacity-60">pts</span></p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors backdrop-blur-sm">
              查看详情
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="relative w-96 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="搜索任务、用户或活动..." 
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="flex items-center space-x-5">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
              <Bell className="w-5.5 h-5.5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <div className="flex items-center space-x-3 group">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">{user.username}</p>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{user.title}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">你好, {user.username} 👋</h1>
                  <p className="text-slate-500 mt-1 font-medium">今天是 2026年4月13日，看看你今天的任务进度。</p>
                </div>
                <button className="flex items-center px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
                  <Plus className="w-5 h-5 mr-2" />
                  发布新任务
                </button>
              </div>

              {/* Stats Grid */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard label="进行中任务" value={stats.ongoingTasks} icon={Clock} trend={12} colorClass="bg-blue-50 text-blue-600" />
                  <StatCard label="已完成任务" value={stats.completedTasks} icon={CheckCircle2} trend={8} colorClass="bg-emerald-50 text-emerald-600" />
                  <StatCard label="累计获得积分" value={user.points} icon={Award} trend={24} colorClass="bg-amber-50 text-amber-600" />
                  <StatCard label="平台总人数" value="1,248" icon={UserIcon} trend={5} colorClass="bg-indigo-50 text-indigo-600" />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-900 text-lg mb-8">积分获取趋势</h3>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[{ name: '周一', points: 120 }, { name: '周二', points: 450 }, { name: '周三', points: 320 }, { name: '周四', points: 680 }, { name: '周五', points: 290 }, { name: '周六', points: 150 }, { name: '周日', points: 380 }]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                          <Tooltip contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                          <Line type="monotone" dataKey="points" stroke="#3b82f6" strokeWidth={4} dot={{fill: '#3b82f6', r: 4, stroke: '#fff'}} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-900 text-lg">推荐任务</h3>
                      <button className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center group">
                        查看全部 <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tasks.slice(0, 4).map(task => (
                        <TaskCard key={task.id} task={task} onAction={(t) => setShowSubmitModal(t)} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-900 text-lg mb-6">任务分布</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{ name: '技术', count: 8 }, { name: '设计', count: 5 }, { name: '社区', count: 3 }, { name: '产品', count: 4 }]} layout="vertical" margin={{ left: -20 }}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                            {[0, 1, 2, 3].map((i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-900 text-lg mb-6">最近活动</h3>
                    <div className="space-y-6">
                      {activities.map(activity => (
                        <div key={activity.id} className="flex space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${activity.user}`} alt="" className="w-7 h-7 rounded-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 leading-snug"><span className="font-bold">{activity.user}</span> {activity.action}</p>
                            <p className="text-xs font-bold text-primary-600 mt-0.5 truncate">{activity.target}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'audit' && isAuditor && (
            <div className="space-y-8">
              <h1 className="text-2xl font-extrabold text-slate-900">任务审核队列</h1>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">提交者</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">任务</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">提交时间</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">状态</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-medium">暂无待审核的任务提交</td>
                      </tr>
                    ) : (
                      submissions.map(sub => {
                        const subTask = tasks.find(t => t.id === sub.taskId);
                        return (
                          <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.userId}`} alt="" />
                                </div>
                                <span className="text-sm font-bold text-slate-900">User_{sub.userId}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-medium text-slate-600">{subTask?.title || '未知任务'}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs text-slate-500">{new Date(sub.submittedAt).toLocaleString()}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                                sub.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                              }`}>
                                {sub.status === 'pending' ? '待审核' : sub.status === 'approved' ? '已通过' : '已驳回'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {sub.status === 'pending' && (
                                <div className="flex justify-end space-x-2">
                                  <button onClick={() => handleAudit(sub.id, 'rejected')} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                                  <button onClick={() => handleAudit(sub.id, 'approved')} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"><CheckCircle2 className="w-5 h-5" /></button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-8">
               <h1 className="text-2xl font-extrabold text-slate-900">探索任务</h1>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {tasks.map(task => (
                   <TaskCard key={task.id} task={task} onAction={(t) => setShowSubmitModal(t)} />
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'project_invitation' && (
            <div className="space-y-6">


              {/* Tabs */}
              <div className="flex items-center space-x-6 border-b border-slate-200">
                <button
                  onClick={() => setProjectInvitationTab('projects')}
                  className={`flex items-center pb-3 text-sm font-medium transition-colors relative ${
                    projectInvitationTab === 'projects'
                      ? 'text-primary-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  项目中心
                  {projectInvitationTab === 'projects' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full" />
                  )}
                </button>
                <button
                  onClick={() => setProjectInvitationTab('invitations')}
                  className={`flex items-center pb-3 text-sm font-medium transition-colors relative ${
                    projectInvitationTab === 'invitations'
                      ? 'text-primary-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  特邀中心
                  {projectInvitationTab === 'invitations' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full" />
                  )}
                </button>
              </div>

              {/* Projects Tab */}
              {projectInvitationTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">共 {projects.length} 个项目，任务需挂接到项目后才能发布</p>
                    <button className="flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      新建项目
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(project => (
                      <div
                        key={project.id}
                        className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-semibold text-slate-900">{project.title}</h3>
                          <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                            进行中
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">{project.description}</p>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <div className="flex items-center">
                            <ClipboardList className="w-4 h-4 mr-1.5" />
                            {project.taskCount} 个任务
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1.5" />
                            {project.deadline}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Invitations Tab */}
              {projectInvitationTab === 'invitations' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setInvitationViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                          invitationViewMode === 'grid'
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setInvitationViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                          invitationViewMode === 'list'
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      新建特邀
                    </button>
                  </div>

                  {/* Table View */}
                  {invitationViewMode === 'list' && (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500">特邀标题</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500">类型</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500">优先级</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500">人才</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500">截止日期</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500">积分</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {invitations.map(invitation => (
                            <tr key={invitation.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <span className={`w-2 h-2 rounded-full ${
                                    invitation.status === 'completed' ? 'bg-emerald-500' :
                                    invitation.status === 'urgent' ? 'bg-rose-500' :
                                    invitation.status === 'in_progress' ? 'bg-blue-500' :
                                    'bg-slate-300'
                                  }`} />
                                  <span className="text-sm font-medium text-slate-900">{invitation.title}</span>
                                  {invitation.tags?.map((tag, idx) => (
                                    <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                                  {invitation.typeLabel}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-xs px-2 py-1 rounded ${
                                  invitation.priority === 'urgent' ? 'bg-rose-50 text-rose-600' :
                                  invitation.priority === 'high' ? 'bg-amber-50 text-amber-600' :
                                  invitation.priority === 'medium' ? 'bg-blue-50 text-blue-600' :
                                  'bg-slate-50 text-slate-600'
                                }`}>
                                  {invitation.priority === 'urgent' ? '紧急' :
                                   invitation.priority === 'high' ? '高' :
                                   invitation.priority === 'medium' ? '中' : '低'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {invitation.talent ? (
                                  <div className="flex items-center space-x-2">
                                    {invitation.talentAvatar && (
                                      <img src={invitation.talentAvatar} alt="" className="w-6 h-6 rounded-full" />
                                    )}
                                    <span className="text-sm text-slate-600">{invitation.talent}</span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-slate-400">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center text-sm text-slate-500">
                                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                  {invitation.deadline.slice(5)}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm font-medium text-amber-600">{invitation.points}pt</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Grid View */}
                  {invitationViewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {invitations.map(invitation => (
                        <div
                          key={invitation.id}
                          className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className={`w-2 h-2 rounded-full ${
                                invitation.status === 'completed' ? 'bg-emerald-500' :
                                invitation.status === 'urgent' ? 'bg-rose-500' :
                                invitation.status === 'in_progress' ? 'bg-blue-500' :
                                'bg-slate-300'
                              }`} />
                              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                                {invitation.typeLabel}
                              </span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              invitation.priority === 'urgent' ? 'bg-rose-50 text-rose-600' :
                              invitation.priority === 'high' ? 'bg-amber-50 text-amber-600' :
                              invitation.priority === 'medium' ? 'bg-blue-50 text-blue-600' :
                              'bg-slate-50 text-slate-600'
                            }`}>
                              {invitation.priority === 'urgent' ? '紧急' :
                               invitation.priority === 'high' ? '高' :
                               invitation.priority === 'medium' ? '中' : '低'}
                            </span>
                          </div>
                          <h3 className="font-semibold text-slate-900 mb-2">{invitation.title}</h3>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-slate-500">
                              <Calendar className="w-3.5 h-3.5 mr-1.5" />
                              {invitation.deadline}
                            </div>
                            <span className="font-medium text-amber-600">{invitation.points}pt</span>
                          </div>
                          {invitation.talent && (
                            <div className="mt-3 flex items-center space-x-2 pt-3 border-t border-slate-100">
                              {invitation.talentAvatar && (
                                <img src={invitation.talentAvatar} alt="" className="w-6 h-6 rounded-full" />
                              )}
                              <span className="text-sm text-slate-600">{invitation.talent}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">提交任务成果</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">任务: {showSubmitModal.title}</p>
              </div>
              <button onClick={() => setShowSubmitModal(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">完成说明 / 链接</label>
                <textarea 
                  rows={6}
                  value={submitContent}
                  onChange={(e) => setSubmitContent(e.target.value)}
                  placeholder="请简要说明您的工作内容，或提供相关文档/代码链接..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none text-sm leading-relaxed"
                ></textarea>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-2xl border border-primary-100">
                <Award className="w-6 h-6 text-primary-600" />
                <span className="text-sm font-bold text-primary-700">审核通过后，您将获得 {showSubmitModal.points} 积分</span>
              </div>
            </div>
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-end space-x-4">
              <button onClick={() => setShowSubmitModal(null)} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">取消</button>
              <button onClick={handleSubmitTask} className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-200 transition-all flex items-center">
                <Send className="w-4.5 h-4.5 mr-2" />
                立即提交
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
