export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export type SkillCategory = 'Frontend' | 'Backend' | 'DevOps' | 'Data & ML' | 'Other';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 to 100
  iconName?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  image: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  type: 'work' | 'education' | 'milestone';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown formatted
  category: string;
  publishedDate: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface ResumeInfo {
  url: string;
  fileName: string;
  uploadedAt: string;
}

export interface SocialLink {
  id: string;
  platform: 'GitHub' | 'LinkedIn' | 'Instagram' | 'Twitter (X)' | 'Email' | 'Portfolio' | 'YouTube' | 'Facebook';
  url: string;
}
