export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'recruiter' | 'admin';
  avatar?: string;
  company?: string;
  skills?: string[];
  resume?: string;
  phone?: string;
  location?: string;
  bio?: string;
  status: 'active' | 'blocked' | 'pending';
  createdAt: Date;
  lastLogin?: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'full-time' | 'part-time';
  description: string;
  requirements: string[];
  salary?: string;
  duration?: string;
  postedBy: string;
  postedAt: Date;
  deadline: Date;
  applications: number;
  status: 'active' | 'closed' | 'draft';
  tags: string[];
  remote: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: Date;
  coverLetter?: string;
  resume?: string;
  notes?: string;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface ExcelUpload {
  id: string;
  userId: string;
  filename: string;
  uploadedAt: Date;
  data: any[];
  columns: string[];
  chartHistory: Chart[];
  fileSize: number;
}

export interface Chart {
  id: string;
  type: '2d' | '3d';
  chartType: 'bar' | 'line' | 'pie' | 'scatter' | 'bubble';
  xAxis: string;
  yAxis: string;
  zAxis?: string;
  title: string;
  createdAt: Date;
  config: any;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application' | 'job' | 'upload' | 'system' | 'interview';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface BookmarkedJob {
  id: string;
  userId: string;
  jobId: string;
  bookmarkedAt: Date;
}