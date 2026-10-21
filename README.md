# Gopalakrishnan S — Portfolio

React 18 + Vite, React Router, Bootstrap 5 (react-bootstrap), custom hooks and components.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the build
```

## Structure
```
public/            favicon, _redirects (Netlify SPA routing)
  assets (src/assets)  profile.jpg and the resume PDF
src/
  main.jsx         router + theme provider + CSS imports
  App.jsx          route table
  context/         ThemeContext (dark/light, also sets Bootstrap data-bs-theme)
  hooks/           useScrollProgress, useInView, useDecodeText, useDocumentTitle
  data/            profile, projects, skills, routes, logos, previews, icons, worldMap
  components/      Layout, Navbar, Sidebar, Cosmos (world-map canvas), SpotlightCard,
                   Reveal, CoinPhoto, ResumeButton, ProjectCard, ProjectModal, TechLogo, Wave, ...
  pages/           Home, About, Skills, Experience, Projects, Certifications, Contact, NotFound
  styles/          theme.css (colors), global.css, sidebar.css, logos.css
```

## Things you will want to edit
- **Project links**: add `links: { demo: '...', code: '...' }` to a project in `src/data/projects.js`; the buttons appear automatically.
- **Photo**: replace `src/assets/profile.jpg` (square, 700px+). It appears on the hero coin (timing: gsToss and gsFlip keyframes in global.css).
- **Resume**: replace `src/assets/Gopalakrishnan_S_Resume.pdf` (keep the file name).
- **Social links**: URLs live in `src/data/profile.js`; the UI shows only the icons (Bootstrap Icons, MIT).
- **Colors**: `src/styles/theme.css` (dark and light palettes).
- **Contact form**: submits through FormSubmit to the email in `src/data/profile.js`; the first submission requires confirming the activation email FormSubmit sends you. Visitors do not need an email app configured.

## Deploy
### Vercel (recommended)

Import the GitHub repository into Vercel. The Vercel project settings should use:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: the repository root

The root `vercel.json` rewrites app routes to `index.html`, so React Router routes continue to work when opened directly or refreshed. Once GitHub is connected, each push triggers a new deployment. Keep the repository private if you want to keep the source code private; the deployed portfolio itself is public.

Cloudflare Pages is also supported with build command `npm run build` and output directory `dist`.

Netlify: build command `npm run build`, publish directory `dist` (the `_redirects` file handles routing).
