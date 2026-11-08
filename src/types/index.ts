export type AspectRatio = '16:9' | '9:16';

export interface Project {
  id: string;
  title: string;
  format: string;
  aspectRatio: AspectRatio;
  role: string;
  description: string;
  coverUrl: string;
  videoUrl?: string;
  tools: string[];
  year: string;
  duration: string;
  featured: boolean;
  published: boolean;
  isPlaceholder?: boolean;
  order: number;
  client?: string;
}

export interface SiteConfig {
  authorName: string;
  telegramUrl: string;
  email: string;
  status: string;
  demoMode: boolean; // Controls whether the 5 future project slots are shown
  heroVideo: {
    enabled: boolean;
    videoUrl: string;
  };
}

export interface ProjectInquiry {
  id: string;
  createdAt: string;
  clientName: string;
  contact: string;
  projectType: string;
  materialLink?: string;
  notes: string;
  status: 'new' | 'in_progress' | 'completed';
}

export interface AuthUser {
  email: string;
  name: string;
  isAdmin: boolean;
  loggedInAt: string;
}

