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
### Cloudflare Pages (recommended)

Connect this project to a GitHub repository using Cloudflare Pages' Git integration. Set:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/` (the repository root)

Cloudflare will build and publish each push to the production branch. Push updates to GitHub to publish changes; pull requests and other branches can be used for previews. Keep the repository private if you do not want the source code to be public. The portfolio itself will be public once deployed.

This is a React single-page app. Cloudflare Pages serves the app routes through its SPA fallback when there is no top-level `404.html`; the current build does not produce one.

Netlify: build command `npm run build`, publish directory `dist` (the `_redirects` file handles routing).
Vercel: add a rewrite of `/(.*)` to `/index.html`.
