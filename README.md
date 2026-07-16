# Karan Desale — Premium Python Full Stack Developer Portfolio

A highly optimized, premium developer portfolio website designed for full-stack engineers specializing in **Python, Django, React, SQL, and Machine Learning / Computer Vision**. Built using **React 19, Vite, Tailwind CSS v4, and Framer Motion**, this portfolio is fully responsive, SEO-optimized, recruiter-ready, and deployment-ready on any hosting provider.

---

## 🚀 Key Features

- **Typing Sub-Heading Animation**: Dynamically cycles through key engineering specialties (e.g., Python, Django, React, SQL, OpenCV) with custom speed and cursors.
- **Interactive Mouse Glow Overlay**: A subtle, high-performance radial cursor glow following mouse coordinates in dark mode.
- **Global Viewport Scroll Progress**: A gradient indicator at the top of the page representing active scroll depth.
- **Glassmorphic Theme Switcher**: Allows seamless transition between light and dark modes with persisting local states.
- **Interactive Administration Portal**: Change skills, projects, timeline records, certificates, and your bio dynamically. Bypasses stale browser caches using structural key revisions (`_v2`).
- **PWA & Mobile Ready**: Comes preconfigured with a Web App Manifest (`manifest.json`), custom icons, optimized Unsplash images, and fluid touch interactions for 320px to 4K resolutions.
- **Enterprise-Grade SEO**: Includes JSON-LD Structured Data, Twitter Cards, Open Graph meta tags, verified robot indexing, and an XML sitemap.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS (Utility-First), Framer Motion (Transitions & Animations).
- **Icons**: Lucide React Icons.
- **SEO & Search**: Custom Google Font pre-connects, Web App Manifest, JSON-LD schemas.

---

## 📂 Folder Structure

```text
├── public/
│   ├── manifest.json       # Web App Progressive Web App configuration
│   ├── robots.txt          # SEO Crawl settings
│   └── sitemap.xml         # XML Sitemap locator
├── src/
│   ├── App.tsx             # Main core application entry & global layout
│   ├── components/         # Modular layout segments (Hero, About, Projects, Timeline, Certificates, etc.)
│   ├── data/
│   │   ├── initialData.ts  # Python/Django initial portfolio datasets
│   │   └── portfolioStore.ts # LocalStorage store with automated cache busting
│   ├── types.ts            # TypeScript interfaces
│   └── index.css           # Global custom classes (translucent glass, custom scrollbars)
├── index.html              # Core HTML structure, metadata, pre-connects, and Structured JSON-LD
├── package.json            # Project dependencies & scripts
└── tsconfig.json           # TS Compiler settings
```

---

## ⚡ Deployment Instructions

This portfolio is 100% static-client ready and builds into highly optimized HTML, JS, and CSS static files inside the `dist/` directory.

### 1. Vercel (Recommended)
1. Install the Vercel CLI or import the GitHub repository to your Vercel Dashboard.
2. Select **Vite** as the framework template.
3. Configure settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### 2. Netlify
1. Log in to Netlify and click **Add new site** > **Import from an existing project**.
2. Connect your GitHub repository.
3. Use the following build configurations:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

### 3. Render (Static Site)
1. Log in to Render and click **New +** > **Static Site**.
2. Link your repository.
3. Specify:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Click **Create Static Site**.

### 4. GitHub Pages
1. Install the `gh-pages` helper package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Update your `vite.config.ts` to include the `base` URL of your GitHub repository:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // other config...
   });
   ```
3. Add a deploy script to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -p dist"
   }
   ```
4. Run:
   ```bash
   npm run deploy
   ```

---

## 🧑‍💻 Local Development Setup

To test and run this project locally:

1. Clone or extract files into your directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the site on `http://localhost:3000` (or as specified in the console).

---

## 🏆 Creator Information

- **Name**: Karan Desale
- **Title**: Python Full Stack Developer
- **Email**: karandesale1414@gmail.com
- **LinkedIn**: [linkedin.com/in/karandesale](https://linkedin.com/in/karandesale)
- **GitHub**: [github.com/karandesale](https://github.com/karandesale)
