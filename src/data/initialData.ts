import { Project, Skill, Certificate, TimelineItem, BlogPost, SocialLink } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Apex Analytics: Predictive Intelligence Platform',
    description: 'An enterprise-grade Django backend and React analytics web application providing predictive insights for consumer retention.',
    longDescription: 'Apex Analytics coordinates multi-source customer records and processes raw transactional histories into predictive metrics. The backend is built with Django REST Framework, utilizing highly optimized raw SQL queries and window functions for analytical aggregations. An integrated Scikit-Learn pipeline runs asynchronous inference to compute retention probability, and feeds dynamic React charts built with Recharts and styled with premium glassmorphic layers.',
    technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'Scikit-Learn', 'Tailwind CSS', 'Docker'],
    githubUrl: 'https://github.com/karandesale/apex-analytics',
    liveUrl: 'https://apex-analytics.demo',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['Python', 'Django', 'React', 'SQL', 'Machine Learning']
  },
  {
    id: 'p2',
    title: 'Sentinel-AI: Gesture & Computer Vision Security Suite',
    description: 'A high-performance computer vision system leveraging OpenCV, Python, and React for live-streamed motion and gesture detection.',
    longDescription: 'Sentinel-AI is a real-time computer vision security dashboard that captures camera feeds and runs hand tracking, gesture recognition, and facial detection algorithms. Built with Python and OpenCV, it uses lightweight WebSocket feeds to stream dynamic gesture-triggered events directly to an interactive, fully responsive React client interface. The system features custom-configured motion triggers and interactive calibration screens.',
    technologies: ['Python', 'OpenCV', 'React', 'WebSockets', 'Framer Motion', 'Tailwind CSS', 'Git'],
    githubUrl: 'https://github.com/karandesale/sentinel-ai',
    liveUrl: 'https://sentinel-ai.demo',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['Python', 'OpenCV', 'Real-Time', 'Machine Learning']
  },
  {
    id: 'p3',
    title: 'CoreEngine: REST API Gateway & Order Orchestrator',
    description: 'A highly scalable, secure microservices backend built with Django REST Framework and custom SQL relational databases.',
    longDescription: 'CoreEngine is an architectural blueprint for warehouse inventory and order tracking. It features complex MySQL schema designs, foreign-key indexing, and structured transactional triggers. The gateway supports JWT authentication, API rate limiting, and lazy cache invalidation through Redis. Features an elegant React-based admin hub for live service monitoring.',
    technologies: ['Python', 'Django REST Framework', 'MySQL', 'Redis', 'React', 'Tailwind CSS', 'Docker'],
    githubUrl: 'https://github.com/karandesale/core-engine',
    liveUrl: 'https://core-engine.demo',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['Python', 'Django', 'REST API', 'SQL']
  },
  {
    id: 'p4',
    title: 'InsightDB: Interactive SQL Schema & Query Analyzer',
    description: 'A visual diagnostic developer sandbox to optimize relational SQL queries and automatically map complex database schemas.',
    longDescription: 'InsightDB simplifies database optimization for backend developers. Built on a Python FastAPI core, it parses raw SQL scripts, tracks query execution plans, and analyzes indexes. The frontend represents database tables as interactive nodes with drag-and-drop mechanics in React, helping engineers spot missing constraints and optimize slow queries.',
    technologies: ['Python', 'FastAPI', 'React', 'SQL', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions'],
    githubUrl: 'https://github.com/karandesale/insight-db',
    liveUrl: 'https://insight-db.demo',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Python', 'SQL', 'Developer Tools']
  }
];

export const INITIAL_SKILLS: Skill[] = [
  // Backend
  { id: 's1', name: 'Python', category: 'Backend', proficiency: 96, iconName: 'Terminal' },
  { id: 's2', name: 'Django', category: 'Backend', proficiency: 94, iconName: 'Server' },
  { id: 's3', name: 'REST API', category: 'Backend', proficiency: 93, iconName: 'Workflow' },
  { id: 's4', name: 'SQL', category: 'Backend', proficiency: 90, iconName: 'Database' },
  { id: 's5', name: 'MongoDB', category: 'Backend', proficiency: 85, iconName: 'FolderOpen' },

  // Frontend
  { id: 's6', name: 'React', category: 'Frontend', proficiency: 95, iconName: 'Layers' },
  { id: 's7', name: 'JavaScript', category: 'Frontend', proficiency: 92, iconName: 'Code2' },
  { id: 's8', name: 'HTML & CSS', category: 'Frontend', proficiency: 98, iconName: 'FileCode2' },
  { id: 's9', name: 'Tailwind CSS', category: 'Frontend', proficiency: 96, iconName: 'Palette' },
  { id: 's10', name: 'Responsive Design', category: 'Frontend', proficiency: 97, iconName: 'Monitor' },
  
  // DevOps & Tools
  { id: 's11', name: 'Git', category: 'DevOps', proficiency: 91, iconName: 'GitBranch' },
  { id: 's12', name: 'GitHub', category: 'DevOps', proficiency: 92, iconName: 'Github' },

  // Data & ML
  { id: 's13', name: 'Machine Learning', category: 'Data & ML', proficiency: 84, iconName: 'Brain' },
  { id: 's14', name: 'OpenCV', category: 'Data & ML', proficiency: 82, iconName: 'Eye' }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'c1',
    title: 'Professional Cloud Architect',
    issuer: 'Google Cloud Platform (GCP)',
    date: 'Dec 2025',
    verificationUrl: 'https://google.credential.net/example-pca',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
    description: 'Validated expert proficiency in designing, developing, and managing robust, secure, and scalable cloud solutions on Google Cloud.'
  },
  {
    id: 'c2',
    title: 'Solutions Architect - Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Jun 2025',
    verificationUrl: 'https://aws.amazon.com/verification',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
    description: 'Demonstrated deep understanding of cloud infrastructure design, multi-tier system migration, cost optimization, and secure networks.'
  },
  {
    id: 'c3',
    title: 'Front-End Professional Certificate',
    issuer: 'Meta (via Coursera)',
    date: 'Mar 2024',
    verificationUrl: 'https://coursera.org/verify/example-meta',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80',
    description: 'Rigorous 9-course curriculum specializing in responsive React development, UI/UX, testing with Jest, and advanced JavaScript architecture.'
  }
];

export const INITIAL_TIMELINE: TimelineItem[] = [
  {
    id: 't1',
    role: 'Python Full Stack Developer',
    company: 'TechNova Solutions',
    duration: '2025 - Present',
    description: [
      'Developed and optimized production Django backends and React frontends, handling high-throughput REST API requests.',
      'Designed and executed complex PostgreSQL query optimizations and relational schema structures, improving API search latency by 45%.',
      'Integrated Scikit-Learn models and OpenCV processing pipelines into real-time web control panels using WebSockets.'
    ],
    type: 'work'
  },
  {
    id: 't2',
    role: 'Django Backend Engineer',
    company: 'CloudScale Inc',
    duration: '2023 - 2025',
    description: [
      'Spearheaded the migration of legacy service gateways to Django REST Framework (DRF) with custom JWT authentication.',
      'Created modular, reusable UI components using React, Tailwind CSS, and Framer Motion to build data-intensive dashboard interfaces.',
      'Set up Git-driven continuous integration and deployed containerized services using Docker to scale on-demand cloud infrastructure.'
    ],
    type: 'work'
  },
  {
    id: 't3',
    role: 'Software Developer',
    company: 'InnovateLab',
    duration: '2021 - 2023',
    description: [
      'Implemented responsive design strategies, standardizing HTML/CSS patterns for dynamic web applications.',
      'Designed and executed queries on SQL and MongoDB databases to analyze transactional datasets with zero data loss.',
      'Automated OpenCV camera calibration and object-detection tasks, delivering live web analytics previews.'
    ],
    type: 'work'
  },
  {
    id: 't4',
    role: 'Bachelor of Engineering in Computer Science',
    company: 'Mumbai University',
    duration: '2017 - 2021',
    description: [
      'Specialized in Software Engineering, Object-Oriented Programming, and Relational Databases.',
      'Graduated with honors, demonstrating top-tier coding performance in competitive programming algorithms.',
      'Completed major projects on Machine Learning classifiers and dynamic client-server web apps.'
    ],
    type: 'education'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Deep Dive into React 19: Compiler, Server Actions, and Beyond',
    excerpt: 'The ultimate guide to the React 19 compiler, understanding how auto-memoization is shaping frontend development, and mastering Server Actions.',
    content: `## The Era of React Compiler (React Forget)

React 19 represents one of the most exciting updates in years. The headline feature is the **React Compiler**, an experimental build-time tool that automatically optimizes your application code. 

For years, developers have spent hours manually writing optimizations using:
* \`useMemo\`
* \`useCallback\`
* \`React.memo\`

The React Compiler analyses your JavaScript control-flow structures and inserts optimal memoization blocks during compilation. This significantly reduces boilerplate and prevents unnecessary re-renders out-of-the-box.

### What about Server Actions?

React 19 native support for Server Actions shifts the mental model of client-server communication. By writing standard async functions that call database or API handlers directly from your component files:

\`\`\`tsx
async function updateProfile(formData: FormData) {
  'use server';
  const name = formData.get("name");
  await db.users.update({ name });
}
\`\`\`

React automatically serializes parameters, coordinates the fetch request behind the scenes, and returns the response elegantly.

### Best Practices to Start Today

1. **Avoid Over-optimizing:** Stop adding manual hooks if you are running the compiler.
2. **Transition Hooks:** Leverage the new \`useTransition\` hook to manage pending states, loaders, and error states gracefully during client-to-server operations.
3. **Document-level Metadata:** Enjoy direct, native support for title, meta, and link tags without external helmet packages.`,
    category: 'React & Frontend',
    publishedDate: 'Jul 12, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'Frontend', 'Web Dev']
  },
  {
    id: 'b2',
    title: 'Architecting Ultra-Low Latency Distributed Systems with Go & Kafka',
    excerpt: 'Learn the architectural patterns required to ingest, buffer, process, and store hundreds of thousands of events per second with high reliability.',
    content: `## Ingesting Event Storms at Scale

When managing telemetry logs, IoT sensor updates, or clickstream events, standard REST servers quickly hit database write limits and connection lockouts. High-volume ingestion architectures rely on the **Buffer-Parser-Store** pattern.

### 1. Buffering with Apache Kafka

Apache Kafka provides an incredible distributed pub/sub system designed to act as a resilient write-ahead buffer. 
* **Partitioning:** Partition your topics by customer ID or timestamp to achieve parallel processing streams.
* **Retention:** Store events safely for a configurable window (e.g., 7 days) to survive transient downstream failures.

### 2. High-Speed Consumers in Go

Go is the gold standard for backend services due to its ultra-lightweight execution threads (**Goroutines**). Here is a standard structural setup for an concurrent Kafka consumer:

\`\`\`go
func main() {
    reader := kafka.NewReader(kafka.ReaderConfig{
        Brokers: []string{"localhost:9092"},
        Topic:   "system-logs",
        GroupID: "analytics-group",
    })
    
    // Concurrent Worker Pool
    jobs := make(chan []byte, 100)
    for w := 1; w <= 10; w++ {
        go worker(jobs)
    }

    for {
        msg, err := reader.ReadMessage(context.Background())
        if err != nil {
            break
        }
        jobs <- msg.Value
    }
}
\`\`\`

This pattern reads records continuously in a single thread, and distributes computational work (decoding, sanitizing) across a safe worker pool without locking resources.

### 3. Elastic Indexing

Using **Elasticsearch** or other column-oriented analytical stores like ClickHouse ensures your log data remains searchable within milliseconds, keeping analytic dashboard charts responsive and helpful.`,
    category: 'Cloud & Systems',
    publishedDate: 'Jun 28, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    tags: ['Go', 'Kafka', 'System Architecture', 'DevOps']
  },
  {
    id: 'b3',
    title: 'Designing Beautiful Glassmorphic Interfaces with Tailwind CSS',
    excerpt: 'Glassmorphic styles bring depth and visual hierarchy to flat designs. Here is how to construct a pixel-perfect, accessible translucent card.',
    content: `## The Evolution of Neomorphism to Glassmorphism

While neomorphism suffered from critical accessibility and contrast flaws, **Glassmorphism** has emerged as a premium aesthetic option because it preserves clear separation, text readability, and spatial depth.

It mimics translucent materials (like frosted glass) with light refraction, drop shadows, and delicate borders.

### Visual Foundations

A perfect frosted glass card is constructed from three overlapping layers:
1. **Semi-transparent fill:** A slight backdrop color to tint the background behind it.
2. **Backdrop blur:** This diffuses the color from elements underneath, preventing high-contrast shapes from clashing with the text above.
3. **Outer border:** A subtle, light stroke that establishes the card boundary.

### Constructing it with Tailwind CSS

Tailwind CSS v4 makes glassmorphic styling incredibly simple through unified utility syntax. Here is a baseline card design:

\`\`\`html
<div class="rounded-2xl p-8 bg-white/40 dark:bg-slate-950/45 backdrop-blur-md border border-white/25 dark:border-white/10 shadow-lg">
  <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Translucent Glass Card</h3>
  <p class="mt-2 text-slate-600 dark:text-slate-300">Beautiful, accessible, and responsive.</p>
</div>
\`\`\`

### Avoiding Common Contrast Pitfalls

To guarantee beautiful and eye-safe glassmorphic layouts:
* **Background Contrast:** Ensure elements moving underneath the card do not blend entirely with white text.
* **Fallbacks:** Always double-check standard background styling on older browsers that lack backdrop-filter support.
* **Negative Space:** Give glass elements ample space. Crowded grids lose the sense of layer depth.`,
    category: 'Design & UI',
    publishedDate: 'May 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Tailwind', 'CSS', 'Design System', 'UI/UX']
  }
];

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { id: 'sl1', platform: 'GitHub', url: 'https://github.com/karandesale' },
  { id: 'sl2', platform: 'LinkedIn', url: 'https://linkedin.com/in/karandesale' },
  { id: 'sl3', platform: 'Instagram', url: '' },
  { id: 'sl4', platform: 'Twitter (X)', url: '' },
  { id: 'sl5', platform: 'Email', url: 'mailto:karandesale1414@gmail.com' },
  { id: 'sl6', platform: 'Portfolio', url: 'https://kd.dev' },
  { id: 'sl7', platform: 'YouTube', url: '' },
  { id: 'sl8', platform: 'Facebook', url: '' }
];

