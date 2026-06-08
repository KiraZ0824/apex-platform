import { Task, Submission, User, Activity, UserStats, Project, Invitation, LearningResource, InvitationItem } from '../types';
import { mockTasks, mockActivities, mockUserStats, mockProjects, mockInvitations, mockLearningResources, mockMyInvitations, mockPlatformInvitations } from '../data/mockData';

// 模拟数据库
let tasks = [...mockTasks];
let activities = [...mockActivities];
let submissions: Submission[] = [];
let users: User[] = [
  {
    id: 'u1',
    username: 'Zhuanz',
    role: 'admin',
    points: 2450,
    title: '高级开发者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhuanz'
  },
  {
    id: 'u2',
    username: 'Auditor_Lee',
    role: 'auditor',
    points: 1200,
    title: '审核专员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lee'
  }
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  // 身份验证
  async login(username: string): Promise<User | null> {
    await delay(500);
    return users.find(u => u.username === username) || null;
  },

  // 任务相关
  async getTasks(): Promise<Task[]> {
    await delay(300);
    return [...tasks];
  },

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    await delay(500);
    const newTask = { ...task, id: Math.random().toString(36).substr(2, 9) };
    tasks.unshift(newTask);
    return newTask;
  },

  // 提交相关
  async submitTask(submission: Omit<Submission, 'id' | 'submittedAt' | 'status'>): Promise<Submission> {
    await delay(500);
    const newSubmission: Submission = {
      ...submission,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    submissions.push(newSubmission);
    
    // 更新任务状态为待审核
    const taskIndex = tasks.findIndex(t => t.id === submission.taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].status = 'pending_audit';
    }

    return newSubmission;
  },

  async getSubmissions(): Promise<Submission[]> {
    await delay(300);
    return [...submissions];
  },

  // 审核相关
  async auditSubmission(submissionId: string, auditorId: string, status: 'approved' | 'rejected', comment: string): Promise<Submission | null> {
    await delay(500);
    const index = submissions.findIndex(s => s.id === submissionId);
    if (index === -1) return null;

    const submission = submissions[index];
    submission.status = status;
    submission.auditComment = comment;
    submission.auditorId = auditorId;
    submission.auditedAt = new Date().toISOString();

    const task = tasks.find(t => t.id === submission.taskId);
    if (task) {
      if (status === 'approved') {
        task.status = 'completed';
        // 给用户加积分
        const user = users.find(u => u.id === submission.userId);
        if (user) {
          user.points += task.points;
          // 添加活动记录
          activities.unshift({
            id: Math.random().toString(36).substr(2, 9),
            user: user.username,
            action: '完成了任务',
            target: task.title,
            timestamp: '刚刚',
            points: task.points
          });
        }
      } else {
        task.status = 'ongoing'; // 驳回后恢复为进行中
      }
    }

    return submission;
  },

  // 用户相关
  async getUserStats(userId: string): Promise<UserStats> {
    await delay(300);
    const user = users.find(u => u.id === userId);
    if (!user) return mockUserStats;
    
    return {
      ongoingTasks: tasks.filter(t => t.status === 'ongoing' && t.creatorId === userId).length,
      completedTasks: tasks.filter(t => t.status === 'completed' && t.creatorId === userId).length,
      applyingTasks: tasks.filter(t => t.status === 'applying').length,
      totalPoints: user.points
    };
  },

  async getActivities(): Promise<Activity[]> {
    await delay(300);
    return [...activities];
  },

  // 项目相关
  async getProjects(): Promise<Project[]> {
    await delay(300);
    return [...mockProjects];
  },

  // 特邀相关
  async getInvitations(): Promise<Invitation[]> {
    await delay(300);
    return [...mockInvitations];
  },

  // 学习资源
  async getLearningResources(): Promise<LearningResource[]> {
    await delay(300);
    return [...mockLearningResources];
  },

  // 我的特邀
  async getMyInvitations(): Promise<InvitationItem[]> {
    await delay(300);
    return [...mockMyInvitations];
  },

  // 平台最新特邀
  async getPlatformInvitations(): Promise<InvitationItem[]> {
    await delay(300);
    return [...mockPlatformInvitations];
  }
};
