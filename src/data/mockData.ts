import { Task, Activity, UserStats, Project, Invitation } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: '完成技术文档编写',
    description: '编写关于 RemiCore 同步流的技术规范文档，包括 API 定义和数据结构。',
    points: 100,
    status: 'ongoing',
    deadline: '2026-04-20',
    category: '技术',
    creatorId: 'admin1'
  },
  {
    id: '2',
    title: 'UI 组件库优化',
    description: '优化现有的 React 组件库，提高性能并增强无障碍支持。',
    points: 150,
    status: 'applying',
    deadline: '2026-04-25',
    category: '设计',
    creatorId: 'admin1'
  },
  {
    id: '3',
    title: '自动化测试脚本',
    description: '为核心业务逻辑编写端到端自动化测试脚本。',
    points: 120,
    status: 'completed',
    deadline: '2026-04-10',
    category: '质量保证',
    creatorId: 'admin1'
  },
  {
    id: '4',
    title: '社区反馈处理',
    description: '回复社区用户在 GitHub Issues 中的提问，并整理常见问题。',
    points: 50,
    status: 'ongoing',
    deadline: '2026-04-15',
    category: '社区',
    creatorId: 'admin1'
  },
  {
    id: '5',
    title: '性能调优调研',
    description: '调研并测试提高系统响应速度的各种方案。',
    points: 200,
    status: 'pending_audit',
    deadline: '2026-04-12',
    category: '研发',
    creatorId: 'admin1'
  }
];

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    user: '张三',
    action: '提交了任务',
    target: '性能调优调研',
    timestamp: '2小时前',
    points: 200
  },
  {
    id: 'a2',
    user: '李四',
    action: '报名了任务',
    target: 'UI 组件库优化',
    timestamp: '5小时前'
  },
  {
    id: 'a3',
    user: '王五',
    action: '完成了任务',
    target: '自动化测试脚本',
    timestamp: '1天前',
    points: 120
  }
];

export const mockUserStats: UserStats = {
  ongoingTasks: 2,
  completedTasks: 15,
  applyingTasks: 1,
  totalPoints: 2450
};

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: '跨境支付行业现状授课顾问',
    description: '跨境支付行业现状授课顾问',
    status: 'ongoing',
    taskCount: 0,
    deadline: '2026-05-30',
    createdAt: '2026-03-01'
  },
  {
    id: 'p2',
    title: '中国区域跨境支付公司合作',
    description: '寻求中国区域跨境支付公司加入Remi',
    status: 'ongoing',
    taskCount: 0,
    deadline: '2026-04-30',
    createdAt: '2026-02-15'
  }
];

export const mockInvitations: Invitation[] = [
  {
    id: 'i1',
    title: '跨境支付行业现状授课顾问',
    type: 'expert_consultant',
    typeLabel: '专家顾问',
    priority: 'high',
    status: 'open',
    talent: null,
    deadline: '2026-05-09',
    points: 100,
    tags: ['专家', '顾问']
  },
  {
    id: 'i2',
    title: '中国境内支付公司中层管理联合',
    type: 'business_cooperation',
    typeLabel: '商务合作',
    priority: 'medium',
    status: 'in_progress',
    talent: null,
    deadline: '2026-04-15',
    points: 10,
    tags: ['CTO', 'CEO', 'COO']
  },
  {
    id: 'i3',
    title: '寻求银行跨境结算系统商务合作',
    type: 'business_cooperation',
    typeLabel: '商务合作',
    priority: 'high',
    status: 'open',
    talent: null,
    deadline: '2026-03-31',
    points: 3
  },
  {
    id: 'i4',
    title: '积分核算引擎',
    type: 'core',
    typeLabel: '核心',
    priority: 'high',
    status: 'completed',
    talent: '李婷',
    talentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=李婷',
    deadline: '2026-03-26',
    points: 350
  },
  {
    id: 'i5',
    title: '用户权限系统设计',
    type: 'auth',
    typeLabel: '后端',
    priority: 'high',
    status: 'completed',
    talent: null,
    deadline: '2026-03-30',
    points: 250
  },
  {
    id: 'i6',
    title: 'KYC实名认证集成',
    type: 'compliance',
    typeLabel: '合规',
    priority: 'medium',
    status: 'in_progress',
    talent: null,
    deadline: '2026-04-05',
    points: 280
  },
  {
    id: 'i7',
    title: 'Kanban看板前端组件开发',
    type: 'frontend',
    typeLabel: '前端',
    priority: 'high',
    status: 'completed',
    talent: '张明',
    talentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张明',
    deadline: '2026-03-20',
    points: 300
  },
  {
    id: 'i8',
    title: '稳定币结算智能合约',
    type: 'web3',
    typeLabel: 'Web3',
    priority: 'urgent',
    status: 'urgent',
    talent: '陈思',
    talentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=陈思',
    deadline: '2026-03-25',
    points: 450
  },
  {
    id: 'i9',
    title: '数据看板Dashboard',
    type: 'frontend',
    typeLabel: '前端',
    priority: 'medium',
    status: 'in_progress',
    talent: '张明',
    talentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张明',
    deadline: '2026-03-22',
    points: 200
  },
  {
    id: 'i10',
    title: '邀请码快捷登录',
    type: 'auth',
    typeLabel: '认证',
    priority: 'medium',
    status: 'in_progress',
    talent: null,
    deadline: '2026-04-01',
    points: 150
  },
  {
    id: 'i11',
    title: '设计AI匹配算法架构',
    type: 'ai',
    typeLabel: 'AI',
    priority: 'urgent',
    status: 'urgent',
    talent: '王浩',
    talentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王浩',
    deadline: '2026-03-28',
    points: 500
  }
];
