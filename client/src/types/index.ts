import { ReactNode } from "react";

// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  lastName: string;
  location: string;
  role: "user" | "admin";
  avatar?: string;
}

// Job Types
export interface Job {
  _id: string;
  company: string;
  position: string;
  jobStatus: "pending" | "interview" | "declined";
  jobType: "full-time" | "part-time" | "internship";
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface JobsResponse {
  totalJobs: number;
  numberOfPages: number;
  currentPage: number;
  jobs: Job[];
}

export interface UserResponse {
  user: User;
}

export interface StatsResponse {
  defaultStats: DefaultStats;
  monthlyApplications: MonthlyApplication[];
}

export interface AdminStatsResponse {
  users: number;
  jobs: number;
}

export interface DefaultStats {
  pending: number;
  interview: number;
  declined: number;
}

export interface MonthlyApplication {
  date: string;
  count: number;
}

// Search/Query Types
export interface SearchValues {
  search?: string;
  jobStatus?: string;
  jobType?: string;
  sort?: string;
  page?: string;
}

// Context Types
export interface DashboardContextType {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
}

export interface AllJobsContextType {
  data: JobsResponse;
  searchValues: SearchValues;
}

// Link Types
export interface NavLink {
  text: string;
  path: string;
  icon: ReactNode;
}

// Quote Types
export interface Quote {
  quote: string;
  author: string;
}

// Stat Item Types
export interface StatItemProps {
  count: number;
  title: string;
  icon: ReactNode;
  color: string;
  bcg: string;
}

// Chart Data Types
export interface ChartData {
  date: string;
  count: number;
}
