export type TaskStatus = 'ongoing' | 'completed' | 'applying' | 'pending_audit';

export type UserRole = 'user' | 'auditor' | 'admin';

export type ProjectStatus = 'ongoing' | 'completed' | 'draft';

export type InvitationStatus = 'open' | 'in_progress' | 'completed' | 'urgent';

export type InvitationType = 'expert_consultant' | 'business_cooperation' | 'core' | 'compliance' | 'web3' | 'ai' | 'frontend' | 'backend' | 'auth';

export type PriorityLevel = 'high' | 'medium' | 'low' | 'urgent';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  points: number;
  title: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  status: TaskStatus;
  deadline: string;
  category: string;
  creatorId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  taskCount: number;
  deadline: string;
  createdAt: string;
}

export interface Invitation {
  id: string;
  title: string;
  type: InvitationType;
  typeLabel: string;
  priority: PriorityLevel;
  status: InvitationStatus;
  talent: string | null;
  talentAvatar?: string;
  deadline: string;
  points: number;
  tags?: string[];
}

export interface Submission {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  auditComment?: string;
  auditedAt?: string;
  auditorId?: string;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  points?: number;
}

export interface UserStats {
  ongoingTasks: number;
  completedTasks: number;
  applyingTasks: number;
  totalPoints: number;
}
