import { Project, Skill, Certificate, TimelineItem, BlogPost, ContactMessage, SocialLink } from '../types';
import { INITIAL_PROJECTS, INITIAL_SKILLS, INITIAL_CERTIFICATES, INITIAL_TIMELINE, INITIAL_BLOGS, INITIAL_SOCIAL_LINKS } from './initialData';

// Keys for local storage
const KEYS = {
  PROJECTS: 'portfolio_projects_v2',
  SKILLS: 'portfolio_skills_v2',
  CERTIFICATES: 'portfolio_certificates_v2',
  TIMELINE: 'portfolio_timeline_v2',
  BLOGS: 'portfolio_blogs_v2',
  MESSAGES: 'portfolio_messages_v2',
  RESUME: 'portfolio_resume_v2',
  PROFILE: 'portfolio_profile_v2',
  SOCIAL_LINKS: 'portfolio_social_links_v2',
};

// Helper to get from local storage or fallback
function getStored<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    const parsed = JSON.parse(data);
    if (parsed === null || parsed === undefined) return fallback;
    if (Array.isArray(fallback) && !Array.isArray(parsed)) {
      return fallback;
    }
    return parsed;
  } catch (e) {
    console.error(`Error loading key ${key}`, e);
    return fallback;
  }
}

// Helper to save
function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving key ${key}`, e);
  }
}

export const portfolioStore = {
  // Getters
  getProjects(): Project[] {
    return getStored<Project[]>(KEYS.PROJECTS, INITIAL_PROJECTS);
  },
  
  getSkills(): Skill[] {
    return getStored<Skill[]>(KEYS.SKILLS, INITIAL_SKILLS);
  },
  
  getCertificates(): Certificate[] {
    return getStored<Certificate[]>(KEYS.CERTIFICATES, INITIAL_CERTIFICATES);
  },
  
  getTimeline(): TimelineItem[] {
    return getStored<TimelineItem[]>(KEYS.TIMELINE, INITIAL_TIMELINE);
  },
  
  getBlogs(): BlogPost[] {
    return getStored<BlogPost[]>(KEYS.BLOGS, INITIAL_BLOGS);
  },

  getMessages(): ContactMessage[] {
    return getStored<ContactMessage[]>(KEYS.MESSAGES, []);
  },

  getResume() {
    return getStored<{ url: string; fileName: string; size?: string; date?: string } | null>(KEYS.RESUME, {
      url: '#',
      fileName: 'Karan_Desale_Resume.pdf',
      size: '184 KB',
      date: 'July 2026'
    });
  },

  // Setters / Actions
  saveProjects(projects: Project[]) {
    setStored(KEYS.PROJECTS, projects);
  },

  saveSkills(skills: Skill[]) {
    setStored(KEYS.SKILLS, skills);
  },

  saveCertificates(certificates: Certificate[]) {
    setStored(KEYS.CERTIFICATES, certificates);
  },

  saveTimeline(timeline: TimelineItem[]) {
    setStored(KEYS.TIMELINE, timeline);
  },

  saveBlogs(blogs: BlogPost[]) {
    setStored(KEYS.BLOGS, blogs);
  },

  saveResume(url: string, fileName: string, size?: string) {
    setStored(KEYS.RESUME, {
      url,
      fileName,
      size: size || 'Custom Size',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
  },

  addMessage(msg: Omit<ContactMessage, 'id' | 'date'>) {
    const messages = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: 'm_' + Date.now(),
      date: new Date().toLocaleString()
    };
    messages.unshift(newMsg);
    setStored(KEYS.MESSAGES, messages);
    return newMsg;
  },

  deleteMessage(id: string) {
    const messages = this.getMessages();
    const filtered = messages.filter(m => m.id !== id);
    setStored(KEYS.MESSAGES, filtered);
  },

  clearMessages() {
    setStored(KEYS.MESSAGES, []);
  },

  getProfile() {
    return getStored(KEYS.PROFILE, {
      name: 'Karan Desale',
      title: 'Python Full Stack Developer',
      role: 'Python • Django • React • SQL',
      location: 'Mumbai, Maharashtra, India',
      bio: 'Passionate Python Full Stack Developer focused on building scalable web applications using Django, React, REST APIs, SQL, and modern web technologies. I enjoy solving real-world problems through clean architecture and responsive user experiences.',
      available: true,
      githubUrl: 'https://github.com/karandesale',
      linkedinUrl: 'https://linkedin.com/in/karandesale',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    });
  },

  saveProfile(profile: any) {
    setStored(KEYS.PROFILE, profile);
  },

  getSocialLinks(): SocialLink[] {
    return getStored<SocialLink[]>(KEYS.SOCIAL_LINKS, INITIAL_SOCIAL_LINKS);
  },

  saveSocialLinks(links: SocialLink[]) {
    setStored(KEYS.SOCIAL_LINKS, links);
  }
};
