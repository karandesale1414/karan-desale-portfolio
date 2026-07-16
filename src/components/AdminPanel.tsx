import { useState, FormEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, KeyRound, LayoutDashboard, Plus, Trash2, Edit2, 
  Settings, FolderKanban, Award, ShieldAlert, CheckCircle, 
  LogOut, Star, BookOpen, Inbox, Mail, FileUp, Save,
  Briefcase, GraduationCap, Flag, ChevronDown, Search, 
  Eye, Check, X, ExternalLink, User, Terminal, Share2,
  Github, Linkedin, Instagram, Twitter, Youtube, Facebook, Globe, Link, Upload
} from 'lucide-react';
import { Project, Skill, Certificate, BlogPost, ContactMessage, TimelineItem, SocialLink } from '../types';
import { portfolioStore } from '../data/portfolioStore';

interface AdminPanelProps {
  onDataChange: () => void; // Trigger a state refresh in App.tsx
}

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'GitHub': return Github;
    case 'LinkedIn': return Linkedin;
    case 'Instagram': return Instagram;
    case 'Twitter (X)': return Twitter;
    case 'Email': return Mail;
    case 'Portfolio': return Globe;
    case 'YouTube': return Youtube;
    case 'Facebook': return Facebook;
    default: return Link;
  }
};

type TabType = 'projects' | 'skills' | 'certificates' | 'work' | 'education' | 'milestones' | 'blogs' | 'messages' | 'resume' | 'profile' | 'socials';

export default function AdminPanel({ onDataChange }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('portfolio_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Search & Navigation
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data Lists
  const [projects, setProjects] = useState<Project[]>(() => portfolioStore.getProjects());
  const [certificates, setCertificates] = useState<Certificate[]>(() => portfolioStore.getCertificates());
  const [skills, setSkills] = useState<Skill[]>(() => portfolioStore.getSkills());
  const [blogs, setBlogs] = useState<BlogPost[]>(() => portfolioStore.getBlogs());
  const [timeline, setTimeline] = useState<TimelineItem[]>(() => portfolioStore.getTimeline());
  const [resume, setResume] = useState(() => portfolioStore.getResume());
  const [messages, setMessages] = useState<ContactMessage[]>(() => portfolioStore.getMessages());
  const [profile, setProfile] = useState(() => portfolioStore.getProfile());
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => portfolioStore.getSocialLinks());

  // Form edit states
  const [editingId, setEditingId] = useState<string | null>(null);

  // Dynamic Form states
  const [socialForm, setSocialForm] = useState<Omit<SocialLink, 'id'>>({
    platform: 'GitHub',
    url: ''
  });
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    title: '', description: '', longDescription: '', technologies: [], githubUrl: '', liveUrl: '', image: '', featured: false, tags: []
  });
  const [skillForm, setSkillForm] = useState<Omit<Skill, 'id'>>({
    name: '', category: 'Frontend', proficiency: 80, iconName: 'Terminal'
  });
  const [certForm, setCertForm] = useState<Omit<Certificate, 'id'>>({
    title: '', issuer: '', date: '', verificationUrl: '', image: '', description: ''
  });
  const [blogForm, setBlogForm] = useState<Omit<BlogPost, 'id'>>({
    title: '', excerpt: '', content: '', category: 'React & Frontend', publishedDate: '', readTime: '', image: '', tags: []
  });
  const [timelineForm, setTimelineForm] = useState({
    role: '',
    company: '',
    duration: '',
    descriptionRaw: '',
  });
  const [resumeForm, setResumeForm] = useState({
    fileName: resume?.fileName || 'Karan_Desale_Resume.pdf',
    url: resume?.url || '',
    size: resume?.size || '184 KB'
  });
  const [profileForm, setProfileForm] = useState({
    name: profile?.name || 'Karan Desale',
    title: profile?.title || 'Python Full Stack Developer',
    role: profile?.role || 'Python • Django • React • SQL',
    location: profile?.location || 'Mumbai, Maharashtra, India',
    bio: profile?.bio || '',
    available: profile?.available !== false,
    availableText: profile?.availableText || 'Available for collaboration',
    githubUrl: profile?.githubUrl || '',
    linkedinUrl: profile?.linkedinUrl || '',
    avatarUrl: profile?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  });

  // Sidebar Models List Config
  const tabs: { id: TabType; label: string; icon: any; count: number; isBadge?: boolean }[] = [
    { id: 'projects', label: 'Projects', icon: FolderKanban, count: projects.length },
    { id: 'skills', label: 'Skills', icon: Star, count: skills.length },
    { id: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
    { id: 'work', label: 'Work Experience', icon: Briefcase, count: timeline.filter(t => t.type === 'work').length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: timeline.filter(t => t.type === 'education').length },
    { id: 'milestones', label: 'Milestones', icon: Flag, count: timeline.filter(t => t.type === 'milestone').length },
    { id: 'blogs', label: 'Blog Posts', icon: BookOpen, count: blogs.length },
    { id: 'messages', label: 'Inbox Messages', icon: Inbox, count: messages.length, isBadge: true },
    { id: 'resume', label: 'Resume Config', icon: FileUp, count: resume?.fileName ? 1 : 0 },
    { id: 'profile', label: 'Profile settings', icon: Settings, count: 1 },
    { id: 'socials', label: 'Social Links', icon: Share2, count: socialLinks.length },
  ];

  const activeTabConfig = useMemo(() => tabs.find(t => t.id === activeTab)!, [activeTab]);

  // Search filtering logic for each model
  const filteredSocials = useMemo(() => {
    return socialLinks.filter(s =>
      s.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [socialLinks, searchQuery]);
  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  const filteredSkills = useMemo(() => {
    return skills.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [skills, searchQuery]);

  const filteredCertificates = useMemo(() => {
    return certificates.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [certificates, searchQuery]);

  const filteredWork = useMemo(() => {
    return timeline
      .filter(t => t.type === 'work')
      .filter(t => 
        t.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [timeline, searchQuery]);

  const filteredEducation = useMemo(() => {
    return timeline
      .filter(t => t.type === 'education')
      .filter(t => 
        t.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [timeline, searchQuery]);

  const filteredMilestones = useMemo(() => {
    return timeline
      .filter(t => t.type === 'milestone')
      .filter(t => 
        t.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [timeline, searchQuery]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  const filteredMessages = useMemo(() => {
    return messages.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  // Handlers & Auth
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('portfolio_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid administrator password key.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Projects CRUD Actions
  const handleSaveProject = (e: FormEvent) => {
    e.preventDefault();
    let updated;
    const data = { ...projectForm };
    if (editingId) {
      updated = projects.map(p => p.id === editingId ? { ...data, id: editingId } : p);
      setEditingId(null);
    } else {
      updated = [...projects, { ...data, id: 'p_' + Date.now() }];
    }
    portfolioStore.saveProjects(updated);
    setProjects(updated);
    onDataChange();
    resetProjectForm();
  };

  const resetProjectForm = () => {
    setProjectForm({ title: '', description: '', longDescription: '', technologies: [], githubUrl: '', liveUrl: '', image: '', featured: false, tags: [] });
    setEditingId(null);
  };

  const startEditProject = (p: Project) => {
    setEditingId(p.id);
    setProjectForm({
      title: p.title,
      description: p.description,
      longDescription: p.longDescription || '',
      technologies: p.technologies || [],
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      image: p.image || '',
      featured: p.featured || false,
      tags: p.tags || []
    });
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    portfolioStore.saveProjects(updated);
    setProjects(updated);
    onDataChange();
    if (editingId === id) resetProjectForm();
  };

  // Skills CRUD Actions
  const handleSaveSkill = (e: FormEvent) => {
    e.preventDefault();
    let updated;
    const data = { ...skillForm };
    if (editingId) {
      updated = skills.map(s => s.id === editingId ? { ...data, id: editingId } : s);
      setEditingId(null);
    } else {
      updated = [...skills, { ...data, id: 's_' + Date.now() }];
    }
    portfolioStore.saveSkills(updated);
    setSkills(updated);
    onDataChange();
    resetSkillForm();
  };

  const resetSkillForm = () => {
    setSkillForm({ name: '', category: 'Frontend', proficiency: 80, iconName: 'Terminal' });
    setEditingId(null);
  };

  const startEditSkill = (s: Skill) => {
    setEditingId(s.id);
    setSkillForm({
      name: s.name,
      category: s.category,
      proficiency: s.proficiency,
      iconName: s.iconName || 'Terminal'
    });
  };

  const handleDeleteSkill = (id: string) => {
    const updated = skills.filter(s => s.id !== id);
    portfolioStore.saveSkills(updated);
    setSkills(updated);
    onDataChange();
    if (editingId === id) resetSkillForm();
  };

  // Certificates CRUD Actions
  const handleSaveCert = (e: FormEvent) => {
    e.preventDefault();
    let updated;
    const data = { ...certForm };
    if (editingId) {
      updated = certificates.map(c => c.id === editingId ? { ...data, id: editingId } : c);
      setEditingId(null);
    } else {
      updated = [...certificates, { ...data, id: 'c_' + Date.now() }];
    }
    portfolioStore.saveCertificates(updated);
    setCertificates(updated);
    onDataChange();
    resetCertForm();
  };

  const resetCertForm = () => {
    setCertForm({ title: '', issuer: '', date: '', verificationUrl: '', image: '', description: '' });
    setEditingId(null);
  };

  const startEditCert = (c: Certificate) => {
    setEditingId(c.id);
    setCertForm({
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      verificationUrl: c.verificationUrl || '',
      image: c.image || '',
      description: c.description || ''
    });
  };

  const handleDeleteCert = (id: string) => {
    const updated = certificates.filter(c => c.id !== id);
    portfolioStore.saveCertificates(updated);
    setCertificates(updated);
    onDataChange();
    if (editingId === id) resetCertForm();
  };

  // Timeline CRUD Actions
  const handleSaveTimeline = (e: FormEvent, type: 'work' | 'education' | 'milestone') => {
    e.preventDefault();
    let updated;
    const descArray = timelineForm.descriptionRaw
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const itemData = {
      role: timelineForm.role,
      company: timelineForm.company,
      duration: timelineForm.duration,
      description: descArray,
      type
    };

    if (editingId) {
      updated = timeline.map(item => item.id === editingId ? { ...itemData, id: editingId } : item);
      setEditingId(null);
    } else {
      updated = [...timeline, { ...itemData, id: 't_' + Date.now() }];
    }
    portfolioStore.saveTimeline(updated);
    setTimeline(updated);
    onDataChange();
    resetTimelineForm();
  };

  const resetTimelineForm = () => {
    setTimelineForm({ role: '', company: '', duration: '', descriptionRaw: '' });
    setEditingId(null);
  };

  const startEditTimeline = (item: TimelineItem) => {
    setEditingId(item.id);
    setTimelineForm({
      role: item.role,
      company: item.company,
      duration: item.duration,
      descriptionRaw: (item.description || []).join('\n')
    });
  };

  const handleDeleteTimeline = (id: string) => {
    const updated = timeline.filter(item => item.id !== id);
    portfolioStore.saveTimeline(updated);
    setTimeline(updated);
    onDataChange();
    if (editingId === id) resetTimelineForm();
  };

  // Blogs CRUD Actions
  const handleSaveBlog = (e: FormEvent) => {
    e.preventDefault();
    let updated;
    const data = { ...blogForm };
    if (editingId) {
      updated = blogs.map(b => b.id === editingId ? { ...data, id: editingId } : b);
      setEditingId(null);
    } else {
      updated = [...blogs, { ...data, id: 'b_' + Date.now(), publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }];
    }
    portfolioStore.saveBlogs(updated);
    setBlogs(updated);
    onDataChange();
    resetBlogForm();
  };

  const resetBlogForm = () => {
    setBlogForm({ title: '', excerpt: '', content: '', category: 'React & Frontend', publishedDate: '', readTime: '', image: '', tags: [] });
    setEditingId(null);
  };

  const startEditBlog = (b: BlogPost) => {
    setEditingId(b.id);
    setBlogForm({
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      publishedDate: b.publishedDate,
      readTime: b.readTime || '',
      image: b.image || '',
      tags: b.tags || []
    });
  };

  const handleDeleteBlog = (id: string) => {
    const updated = blogs.filter(b => b.id !== id);
    portfolioStore.saveBlogs(updated);
    setBlogs(updated);
    onDataChange();
    if (editingId === id) resetBlogForm();
  };

  // Messages Actions
  const handleDeleteMessage = (id: string) => {
    portfolioStore.deleteMessage(id);
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    onDataChange();
  };

  const handleClearAllMessages = () => {
    portfolioStore.clearMessages();
    setMessages([]);
    onDataChange();
  };

  // Resume Config Actions
  const handleSaveResume = (e: FormEvent) => {
    e.preventDefault();
    portfolioStore.saveResume(resumeForm.url, resumeForm.fileName, resumeForm.size);
    setResume(portfolioStore.getResume());
    onDataChange();
  };

  // Profile Settings Actions
  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    portfolioStore.saveProfile(profileForm);
    setProfile(profileForm);
    onDataChange();
  };

  // Social Links CRUD Actions
  const handleSaveSocial = (e: FormEvent) => {
    e.preventDefault();
    let updated;
    const data = { ...socialForm };
    if (editingId) {
      updated = socialLinks.map(s => s.id === editingId ? { ...data, id: editingId } : s);
      setEditingId(null);
    } else {
      updated = [...socialLinks, { ...data, id: 'sl_' + Date.now() }];
    }
    portfolioStore.saveSocialLinks(updated);
    setSocialLinks(updated);
    onDataChange();
    resetSocialForm();
  };

  const resetSocialForm = () => {
    setSocialForm({ platform: 'GitHub', url: '' });
    setEditingId(null);
  };

  const startEditSocial = (s: SocialLink) => {
    setEditingId(s.id);
    setSocialForm({
      platform: s.platform,
      url: s.url
    });
  };

  const handleDeleteSocial = (id: string) => {
    const updated = socialLinks.filter(s => s.id !== id);
    portfolioStore.saveSocialLinks(updated);
    setSocialLinks(updated);
    onDataChange();
    if (editingId === id) resetSocialForm();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-28 relative overflow-hidden">
        {/* Decorative backdrop blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-violet-600/5 dark:bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-indigo-600/5 dark:bg-indigo-600/10 blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl relative z-10 text-left"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl bg-violet-500/10 text-violet-500 border border-violet-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">Admin System Entry</h2>
              <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">CMS Gatekeeper Auth</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            Please enter your administrator security code below to gain read/write access to model states, site telemetry, and contact responses.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 relative">
              <label className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">Security Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:ring-1 focus:ring-violet-500 outline-none"
                  placeholder="Enter administrator passcode"
                  required
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 text-xs bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/15 text-rose-500 rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm shadow-lg shadow-violet-600/20 cursor-pointer active:scale-[0.98] transition-transform duration-100 block text-center"
            >
              Authenticate System
            </button>
            <div className="pt-2 text-center">
              <span className="font-mono text-[9px] text-slate-400">Security notice: Default demo credential is <strong className="text-slate-500 dark:text-slate-350 font-bold">admin123</strong></span>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-left">
      {/* CMS Header Block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400 font-bold">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>00 / ADMINISTRATIVE CMS PANEL</span>
          </div>
          <h1 className="font-display font-light text-4xl text-slate-900 dark:text-white mt-1 tracking-tighter">
            Dynamic <span className="font-bold italic text-violet-500">Portfolio Core</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>SYNCED LIVE</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main CMS Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar: Sticky on Desktop, Hidden/Dropdown-triggered on Mobile */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
          
          {/* Mobile CMS Selector Indicator */}
          <div className="lg:hidden w-full relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
                  <activeTabConfig.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block">ACTIVE MODEL</span>
                  <span className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight">
                    {activeTabConfig.label}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {mobileMenuOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 bg-slate-950/40 z-40 backdrop-blur-xs"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-900 max-h-96 overflow-y-auto"
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setSearchQuery('');
                          setMobileMenuOpen(false);
                          setEditingId(null);
                        }}
                        className={`w-full p-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                          activeTab === tab.id 
                            ? 'bg-violet-50/70 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 font-semibold' 
                            : 'text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <tab.icon className="w-4 h-4" />
                          <span className="font-sans text-sm">{tab.label}</span>
                        </div>
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                          activeTab === tab.id 
                            ? 'bg-violet-500/10 text-violet-500' 
                            : tab.isBadge && tab.count > 0 
                            ? 'bg-rose-500 text-white font-bold animate-pulse' 
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Sidebar */}
          <div className="hidden lg:flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm divide-y divide-slate-100 dark:divide-slate-900">
            <div className="pb-3 px-1">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">CMS MODELS</span>
            </div>
            <div className="pt-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                    setEditingId(null);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-violet-500 text-white font-semibold shadow-md shadow-violet-500/10' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className="w-4 h-4" />
                    <span className="font-sans text-sm">{tab.label}</span>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === tab.id 
                      ? 'bg-white/20 text-white' 
                      : tab.isBadge && tab.count > 0 
                      ? 'bg-rose-500 text-white font-bold' 
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area: Divided into Table and Edit Form */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Active Model Overview and Search */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-500 border border-violet-500/10">
                <activeTabConfig.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-none">
                  {activeTabConfig.label} Manager
                </h2>
                <p className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                  Model code schema: {activeTab}
                </p>
              </div>
            </div>

            {/* General Search Input (Only relevant for lists) */}
            {['projects', 'skills', 'certificates', 'work', 'education', 'milestones', 'blogs', 'messages', 'socials'].includes(activeTab) && (
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  placeholder={`Search ${activeTabConfig.label}...`}
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* MODEL 1: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Table (3/5) */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 overflow-hidden">
                    <h3 className="font-display font-bold text-sm text-slate-400 uppercase tracking-wider">Active Records ({filteredProjects.length})</h3>
                    
                    <div className="overflow-x-auto -mx-6">
                      <table className="w-full min-w-[500px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-900 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/20">
                            <th className="py-3 px-6">Project Metadata</th>
                            <th className="py-3 px-4">Technologies</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-sm">
                          {filteredProjects.length > 0 ? (
                            filteredProjects.map((p) => (
                              <tr key={p.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10">
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    <img src={p.image} className="w-12 h-10 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200/50 dark:border-slate-800" referrerPolicy="no-referrer" />
                                    <div className="min-w-0">
                                      <h4 className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">{p.title}</h4>
                                      <p className="text-xs text-slate-400 truncate max-w-[150px]">{p.description}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                                    {(p.technologies || []).slice(0, 3).map((tech, idx) => (
                                      <span key={idx} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 border border-slate-200/40 dark:border-slate-800/40">{tech}</span>
                                    ))}
                                    {(p.technologies || []).length > 3 && <span className="font-mono text-[9px] text-slate-400">+{p.technologies.length - 3}</span>}
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                  {p.featured ? (
                                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">FEATURED</span>
                                  ) : (
                                    <span className="text-xs text-slate-400 font-mono">-</span>
                                  )}
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button onClick={() => startEditProject(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/10 cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteProject(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">No project records found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Form (2/5) */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                        {editingId ? 'Edit Project Details' : 'Add New Project'}
                      </h3>
                      {editingId && (
                        <button onClick={resetProjectForm} className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer">
                          <X className="w-3.5 h-3.5" /><span>Cancel</span>
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveProject} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Project Title</label>
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="E.g., High-Speed Ingestion Pipeline"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Short Description</label>
                        <input
                          type="text"
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="Teaser snippet for home card grid"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Detailed Description (Markdown)</label>
                        <textarea
                          rows={3}
                          value={projectForm.longDescription}
                          onChange={(e) => setProjectForm({ ...projectForm, longDescription: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white resize-none font-sans"
                          placeholder="In-depth specifications shown in popups"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Technologies (Comma separated)</label>
                          <input
                            type="text"
                            value={projectForm.technologies.join(', ')}
                            onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                            placeholder="Go, React, Kafka"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Categories/Tags (Comma separated)</label>
                          <input
                            type="text"
                            value={projectForm.tags.join(', ')}
                            onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                            placeholder="Distributed, Systems"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Header Image URL</label>
                        <input
                          type="text"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="Unsplash link or path URL"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">GitHub URL</label>
                          <input
                            type="text"
                            value={projectForm.githubUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                            placeholder="https://github.com/..."
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Live Demo URL</label>
                          <input
                            type="text"
                            value={projectForm.liveUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                            placeholder="https://demo.kd.dev/..."
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          id="featured-p"
                          checked={projectForm.featured}
                          onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                          className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 h-4 w-4"
                        />
                        <label htmlFor="featured-p" className="text-xs font-semibold text-slate-600 dark:text-slate-300 select-none">Pin / Feature Project on Home Grid</label>
                      </div>

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md cursor-pointer">
                        <Plus className="w-4 h-4" /><span>{editingId ? 'Save Project Details' : 'Publish Project'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* MODEL 2: SKILLS */}
              {activeTab === 'skills' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Table */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-400 uppercase tracking-wider">Active Records ({filteredSkills.length})</h3>
                    <div className="overflow-x-auto -mx-6">
                      <table className="w-full min-w-[450px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-900 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/20">
                            <th className="py-3 px-6">Skill Name</th>
                            <th className="py-3 px-4">Group Category</th>
                            <th className="py-3 px-4">Proficiency</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-sm">
                          {filteredSkills.length > 0 ? (
                            filteredSkills.map((s) => (
                              <tr key={s.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10">
                                <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">{s.name}</td>
                                <td className="py-4 px-4">
                                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 border border-slate-200/40 dark:border-slate-800/40">{s.category}</span>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-20 bg-slate-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-200/30 dark:border-slate-850">
                                      <div className="bg-violet-500 h-full rounded-full" style={{ width: `${s.proficiency}%` }} />
                                    </div>
                                    <span className="font-mono text-xs font-semibold text-slate-500">{s.proficiency}%</span>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button onClick={() => startEditSkill(s)} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/10 cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteSkill(s.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">No skill records found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                        {editingId ? 'Edit Skill Details' : 'Add New Skill'}
                      </h3>
                      {editingId && (
                        <button onClick={resetSkillForm} className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer">
                          <X className="w-3.5 h-3.5" /><span>Cancel</span>
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveSkill} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Skill Name</label>
                        <input
                          type="text"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="E.g., Go (Golang)"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Group Category</label>
                          <select
                            value={skillForm.category}
                            onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Data & ML">Data & ML</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Proficiency Metric (%)</label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={skillForm.proficiency}
                            onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) || 80 })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Lucide Icon Name representation</label>
                        <input
                          type="text"
                          value={skillForm.iconName}
                          onChange={(e) => setSkillForm({ ...skillForm, iconName: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                          placeholder="E.g. Code2, Server, Database, Cpu, Terminal"
                        />
                      </div>

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md cursor-pointer">
                        <Plus className="w-4 h-4" /><span>{editingId ? 'Save Skill' : 'Publish Skill'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* MODEL 3: CERTIFICATES */}
              {activeTab === 'certificates' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Table */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-400 uppercase tracking-wider">Active Records ({filteredCertificates.length})</h3>
                    <div className="overflow-x-auto -mx-6">
                      <table className="w-full min-w-[500px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-900 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/20">
                            <th className="py-3 px-6">Certificate & Issuer</th>
                            <th className="py-3 px-4">Date Issued</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-sm">
                          {filteredCertificates.length > 0 ? (
                            filteredCertificates.map((c) => (
                              <tr key={c.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10">
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    <img src={c.image} className="w-12 h-8 rounded object-cover bg-slate-100 shrink-0 border border-slate-200/50 dark:border-slate-800" referrerPolicy="no-referrer" />
                                    <div className="min-w-0">
                                      <h4 className="font-semibold text-slate-900 dark:text-white truncate max-w-[180px]">{c.title}</h4>
                                      <span className="font-mono text-[10px] text-slate-400 block">{c.issuer}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4 font-mono text-xs text-slate-500">{c.date}</td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button onClick={() => startEditCert(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/10 cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteCert(c.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="py-8 text-center text-slate-400 text-xs">No certification records found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                        {editingId ? 'Edit Certificate Details' : 'Add New Certificate'}
                      </h3>
                      {editingId && (
                        <button onClick={resetCertForm} className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer">
                          <X className="w-3.5 h-3.5" /><span>Cancel</span>
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveCert} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Certificate Title</label>
                        <input
                          type="text"
                          value={certForm.title}
                          onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="E.g. Professional Cloud Architect"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Issuing Authority</label>
                          <input
                            type="text"
                            value={certForm.issuer}
                            onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                            placeholder="E.g. Google Cloud (GCP)"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Date Tag (E.g. Dec 2025)</label>
                          <input
                            type="text"
                            value={certForm.date}
                            onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                            placeholder="Dec 2025"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Credential Verification URL</label>
                        <input
                          type="text"
                          value={certForm.verificationUrl}
                          onChange={(e) => setCertForm({ ...certForm, verificationUrl: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                          placeholder="Paste credential verification link"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Image/Badge URL</label>
                        <input
                          type="text"
                          value={certForm.image}
                          onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="Image link URL"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Core Description Summary</label>
                        <textarea
                          rows={3}
                          value={certForm.description}
                          onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white resize-none"
                          placeholder="Short summary of validated competencies"
                        />
                      </div>

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md cursor-pointer">
                        <Plus className="w-4 h-4" /><span>{editingId ? 'Save Certificate' : 'Publish Certificate'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* MODELS 4, 5, 6: WORK, EDUCATION, MILESTONES (TIMELINE SUB-SCHEMAS) */}
              {['work', 'education', 'milestones'].includes(activeTab) && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Table */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-400 uppercase tracking-wider">
                      Active {activeTabConfig.label} ({
                        activeTab === 'work' ? filteredWork.length : activeTab === 'education' ? filteredEducation.length : filteredMilestones.length
                      })
                    </h3>
                    <div className="overflow-x-auto -mx-6">
                      <table className="w-full min-w-[500px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-900 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/20">
                            <th className="py-3 px-6">
                              {activeTab === 'work' ? 'Job Title' : activeTab === 'education' ? 'Degree / Major' : 'Milestone/Award'}
                            </th>
                            <th className="py-3 px-4">
                              {activeTab === 'work' ? 'Employer' : activeTab === 'education' ? 'Institution' : 'Context/Host'}
                            </th>
                            <th className="py-3 px-4">Duration</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-sm">
                          {(activeTab === 'work' ? filteredWork : activeTab === 'education' ? filteredEducation : filteredMilestones).length > 0 ? (
                            (activeTab === 'work' ? filteredWork : activeTab === 'education' ? filteredEducation : filteredMilestones).map((item) => (
                              <tr key={item.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10">
                                <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">{item.role}</td>
                                <td className="py-4 px-4 text-slate-650 dark:text-slate-300">{item.company}</td>
                                <td className="py-4 px-4 font-mono text-xs text-slate-500">{item.duration}</td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button onClick={() => startEditTimeline(item)} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/10 cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteTimeline(item.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">No records found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                        {editingId ? `Edit ${activeTabConfig.label}` : `Add ${activeTabConfig.label}`}
                      </h3>
                      {editingId && (
                        <button onClick={resetTimelineForm} className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer">
                          <X className="w-3.5 h-3.5" /><span>Cancel</span>
                        </button>
                      )}
                    </div>

                    <form onSubmit={(e) => handleSaveTimeline(e, activeTab === 'work' ? 'work' : activeTab === 'education' ? 'education' : 'milestone')} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">
                          {activeTab === 'work' ? 'Job Role Title' : activeTab === 'education' ? 'Degree & field' : 'Milestone Title'}
                        </label>
                        <input
                          type="text"
                          value={timelineForm.role}
                          onChange={(e) => setTimelineForm({ ...timelineForm, role: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder={activeTab === 'work' ? 'E.g. Lead systems Builder' : activeTab === 'education' ? 'E.g. B.S. in Computer Science' : 'E.g. Recipient of Dean’s List Award'}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">
                            {activeTab === 'work' ? 'Company Name' : activeTab === 'education' ? 'University / School' : 'Organization/Host Context'}
                          </label>
                          <input
                            type="text"
                            value={timelineForm.company}
                            onChange={(e) => setTimelineForm({ ...timelineForm, company: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                            placeholder={activeTab === 'work' ? 'E.g. TechNova' : activeTab === 'education' ? 'E.g. Stanford University' : 'E.g. Stanford CS'}
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Duration (E.g. 2025 - Present)</label>
                          <input
                            type="text"
                            value={timelineForm.duration}
                            onChange={(e) => setTimelineForm({ ...timelineForm, duration: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                            placeholder="E.g. 2025 - Present"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Bullet Points / Detailed Descriptions (one per line)</label>
                        <textarea
                          rows={5}
                          value={timelineForm.descriptionRaw}
                          onChange={(e) => setTimelineForm({ ...timelineForm, descriptionRaw: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white resize-none leading-relaxed text-xs"
                          placeholder="Bullet point item 1&#10;Bullet point item 2&#10;Bullet point item 3"
                        />
                      </div>

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md cursor-pointer">
                        <Plus className="w-4 h-4" /><span>{editingId ? 'Save Record' : 'Publish Record'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* MODEL 7: BLOG POSTS */}
              {activeTab === 'blogs' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Table */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-400 uppercase tracking-wider">Active Records ({filteredBlogs.length})</h3>
                    <div className="overflow-x-auto -mx-6">
                      <table className="w-full min-w-[500px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-900 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/20">
                            <th className="py-3 px-6">Article Info</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4 text-center">Reading Time</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-sm">
                          {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((b) => (
                              <tr key={b.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10">
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    <img src={b.image} className="w-12 h-8 rounded object-cover bg-slate-100 shrink-0 border border-slate-200/50 dark:border-slate-800" referrerPolicy="no-referrer" />
                                    <div className="min-w-0">
                                      <h4 className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">{b.title}</h4>
                                      <span className="font-mono text-[9px] text-slate-400 block">{b.publishedDate}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4 font-mono text-xs text-slate-500">{b.category}</td>
                                <td className="py-4 px-4 text-center font-mono text-xs text-slate-500">{b.readTime || '-'}</td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button onClick={() => startEditBlog(b)} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/10 cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteBlog(b.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">No blog posts found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                        {editingId ? 'Edit Blog Post' : 'Add New Blog Post'}
                      </h3>
                      {editingId && (
                        <button onClick={resetBlogForm} className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer">
                          <X className="w-3.5 h-3.5" /><span>Cancel</span>
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveBlog} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Article Title</label>
                        <input
                          type="text"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="Deep dive into..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Category (Topic)</label>
                          <input
                            type="text"
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                            placeholder="E.g., Cloud & Systems"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 block">Read Duration tag</label>
                          <input
                            type="text"
                            value={blogForm.readTime}
                            onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                            placeholder="E.g., 6 min read"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Teaser Excerpt</label>
                        <input
                          type="text"
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="Brief preview snippet"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Header Illustration Image URL</label>
                        <input
                          type="text"
                          value={blogForm.image}
                          onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                          placeholder="Image link URL"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Keywords / Tags (Comma separated)</label>
                        <input
                          type="text"
                          value={blogForm.tags.join(', ')}
                          onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                          placeholder="React, TypeScript"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Body Content (Markdown Supported)</label>
                        <textarea
                          rows={6}
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white resize-none font-mono text-xs leading-relaxed"
                          placeholder="## Intro..."
                          required
                        />
                      </div>

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md cursor-pointer">
                        <Plus className="w-4 h-4" /><span>{editingId ? 'Save Article' : 'Publish Article'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* MODEL 8: CONTACT MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white text-base">Received Inquiry Responses ({filteredMessages.length})</h3>
                    {filteredMessages.length > 0 && (
                      <button onClick={handleClearAllMessages} className="text-xs text-rose-500 font-semibold hover:underline cursor-pointer">Clear All Inbox</button>
                    )}
                  </div>

                  {filteredMessages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredMessages.map((msg) => (
                        <div key={msg.id} className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-3 flex flex-col justify-between">
                          <button onClick={() => handleDeleteMessage(msg.id)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/40 cursor-pointer" title="Delete msg"><Trash2 className="w-4 h-4" /></button>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                              <span className="text-violet-600 dark:text-violet-400 font-bold">INBOX RESPONSE</span>
                              <span>{msg.date}</span>
                            </div>
                            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">{msg.subject}</h4>
                            <div className="text-xs space-y-0.5 pt-1">
                              <p className="text-slate-650 dark:text-slate-300"><strong>Sender:</strong> {msg.name}</p>
                              <p className="text-slate-650 dark:text-slate-300">
                                <strong>Email:</strong> <a href={`mailto:${msg.email}`} className="text-violet-500 hover:underline">{msg.email}</a>
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-150 dark:border-slate-800 text-slate-700 dark:text-slate-350 text-xs leading-relaxed font-sans whitespace-pre-wrap max-h-32 overflow-y-auto">
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl text-center text-slate-400 flex flex-col items-center justify-center">
                      <Mail className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-3" />
                      <p className="text-xs">Inquiries inbox is empty. No messages registered yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* MODEL 9: RESUME CONFIGURATION */}
              {activeTab === 'resume' && (
                <div className="max-w-xl mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="p-4 rounded-2xl bg-violet-500/5 dark:bg-violet-400/5 border border-violet-500/10 text-xs text-slate-600 dark:text-slate-350 space-y-2">
                    <p className="font-bold text-violet-600 dark:text-violet-400">Current Configuration details:</p>
                    <p>• File name: <span className="font-mono text-xs font-semibold">{resume?.fileName || 'Karan_Desale_Resume.pdf'}</span></p>
                    <p>• Size Tag: <span className="font-mono text-xs">{resume?.size || '184 KB'}</span></p>
                    <p>• Download url: <span className="font-mono text-[10px] select-all truncate block">{resume?.url || 'N/A'}</span></p>
                    {resume?.date && <p>• Last Updated: <span className="font-mono text-xs">{resume.date}</span></p>}
                  </div>

                  <form onSubmit={handleSaveResume} className="space-y-4 text-left">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 block">Custom File Name</label>
                      <input
                        type="text"
                        value={resumeForm.fileName}
                        onChange={(e) => setResumeForm({ ...resumeForm, fileName: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                        placeholder="Karan_Desale_Resume.pdf"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 block">Size Metric Badge (E.g. 184 KB)</label>
                      <input
                        type="text"
                        value={resumeForm.size}
                        onChange={(e) => setResumeForm({ ...resumeForm, size: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                        placeholder="184 KB"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 block">Download URL Link Path</label>
                      <input
                        type="text"
                        value={resumeForm.url}
                        onChange={(e) => setResumeForm({ ...resumeForm, url: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                        placeholder="Paste link address path URL"
                        required
                      />
                    </div>

                    <button type="submit" className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-[0.98] transition-transform">
                      <Save className="w-4 h-4" /><span>Update Resume configuration</span>
                    </button>
                  </form>
                </div>
              )}

              {/* MODEL 10: PROFILE SETTINGS */}
              {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  
                  <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-400/5 border border-indigo-500/10 text-xs text-slate-600 dark:text-slate-350 space-y-1">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Profile CMS Information model:</p>
                    <p>Updates the homepage dynamically, including titles, names, locations, and other settings.</p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
                    {/* Avatar Upload / Preview Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800">
                      <div className="relative shrink-0">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-sm opacity-75 animate-pulse" />
                        <div className="relative w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-950 flex items-center justify-center overflow-hidden shadow-md">
                          {profileForm.avatarUrl ? (
                            <img src={profileForm.avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <User className="w-8 h-8 text-slate-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 space-y-2 w-full text-left">
                        <label className="text-xs font-semibold text-slate-500 block">Profile Picture (Avatar)</label>
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Paste image URL (e.g. Unsplash)..."
                            value={profileForm.avatarUrl}
                            onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono">OR</span>
                            <label className="px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white font-medium text-[10px] rounded-md cursor-pointer transition-colors inline-flex items-center gap-1 select-none">
                              <Upload className="w-3 h-3" />
                              <span>Upload File</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setProfileForm({ ...profileForm, avatarUrl: reader.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            {profileForm.avatarUrl && (
                              <button
                                type="button"
                                onClick={() => setProfileForm({ ...profileForm, avatarUrl: '' })}
                                className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-600 dark:bg-rose-950/25 dark:text-rose-400 font-medium text-[10px] rounded-md transition-colors cursor-pointer"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Full Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Job Title (Currently)</label>
                        <input
                          type="text"
                          value={profileForm.title}
                          onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Sub-Role Title</label>
                        <input
                          type="text"
                          value={profileForm.role}
                          onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Location</label>
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 block">Biography / Bio Text</label>
                      <textarea
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">GitHub URL</label>
                        <input
                          type="text"
                          value={profileForm.githubUrl}
                          onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">LinkedIn URL</label>
                        <input
                          type="text"
                          value={profileForm.linkedinUrl}
                          onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="avail-checkbox"
                          checked={profileForm.available}
                          onChange={(e) => setProfileForm({ ...profileForm, available: e.target.checked })}
                          className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 h-4 w-4"
                        />
                        <label htmlFor="avail-checkbox" className="text-xs font-semibold text-slate-600 dark:text-slate-300 select-none">Available for collaboration</label>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Availability pill Text</label>
                        <input
                          type="text"
                          value={profileForm.availableText}
                          onChange={(e) => setProfileForm({ ...profileForm, availableText: e.target.value })}
                          className="w-full px-2 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          placeholder="Available for collaboration"
                        />
                      </div>
                    </div>

                    <button type="submit" className="w-full py-3.5 mt-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-[0.98] transition-transform">
                      <Save className="w-4 h-4" /><span>Save profile Configuration</span>
                    </button>
                  </form>
                </div>
              )}

              {/* MODEL 11: SOCIAL LINKS */}
              {activeTab === 'socials' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Table */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-400 uppercase tracking-wider">Active Social Links ({filteredSocials.length})</h3>
                    <div className="overflow-x-auto -mx-6">
                      <table className="w-full min-w-[450px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-900 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/20">
                            <th className="py-3 px-6">Platform</th>
                            <th className="py-3 px-4">URL</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-sm">
                          {filteredSocials.length > 0 ? (
                            filteredSocials.map((s) => {
                              const PlatformIcon = getSocialIcon(s.platform);
                              return (
                                <tr key={s.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10">
                                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">
                                    <div className="flex items-center gap-2">
                                      <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/5">
                                        <PlatformIcon className="w-4 h-4" />
                                      </div>
                                      <span>{s.platform}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4 font-mono text-xs max-w-[200px] truncate text-slate-500 dark:text-slate-455">
                                    {s.url ? (
                                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-violet-500 hover:underline inline-flex items-center gap-1">
                                        {s.url}
                                        <ExternalLink className="w-3 h-3 shrink-0" />
                                      </a>
                                    ) : (
                                      <span className="text-rose-500 italic font-sans">(Empty / Hidden)</span>
                                    )}
                                  </td>
                                  <td className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button onClick={() => startEditSocial(s)} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/10 cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                      <button onClick={() => handleDeleteSocial(s.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={3} className="py-12 text-center text-slate-400 font-medium">
                                No social links match your search query.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">
                        {editingId ? 'Edit Social Link' : 'Add Social Link'}
                      </h3>
                      {editingId && (
                        <button onClick={resetSocialForm} className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-0.5 cursor-pointer">
                          <X className="w-3 h-3" /><span>Cancel Edit</span>
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveSocial} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">Platform</label>
                        <select
                          value={socialForm.platform}
                          onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value as any })}
                          className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white"
                          required
                        >
                          <option value="GitHub">GitHub</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Twitter (X)">Twitter (X)</option>
                          <option value="Email">Email</option>
                          <option value="Portfolio">Portfolio</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Facebook">Facebook</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 block">URL / Link Address</label>
                        <input
                          type="text"
                          value={socialForm.url}
                          onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                          placeholder={socialForm.platform === 'Email' ? 'mailto:example@gmail.com' : 'https://...'}
                          className="w-full px-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-855 dark:text-white font-mono text-xs"
                        />
                        <p className="text-[10px] text-slate-400">If left empty, this icon will automatically hide on the website.</p>
                      </div>

                      <button type="submit" className="w-full py-3.5 mt-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-[0.98] transition-transform">
                        {editingId ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        <span>{editingId ? 'Save Changes' : 'Add Social Link'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>

      </div>
    </div>
  );
}
