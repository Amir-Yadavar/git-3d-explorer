# 🌐 Git3D Explorer (CodeGraph 3D)

An interactive, AI-powered 3D visualizer for GitHub repository architectures and code dependencies using React Three Fiber, D3 Graph algorithms, and Gemini AI.

---

## 🎯 Project Purpose & Strategy
This project addresses the difficulty of understanding complex codebases by rendering repository file trees and `import` dependencies as an interactive 3D force-directed graph. Users can navigate code visually, click on files to inspect their relationships, and ask AI questions about specific code units.

---

## 🛠️ Tech Stack & Architecture
- **Framework:** Next.js (App Router) + TypeScript
- **3D Rendering:** React Three Fiber (R3F) + `@react-three/drei` + Three.js
- **Graph Layout:** `3d-force-graph` / `d3-force-3d`
- **Data Source:** GitHub REST API
- **AI Analysis:** Google Gemini API (`gemini-1.5-flash`)
- **Styling:** Tailwind CSS + Lucide Icons

---

## 🚀 Execution Roadmap & Checklist

- [ ] **Phase 1: Setup & Data Fetching**
  - Implement GitHub API integration to fetch repo file trees (`app/api/github/route.ts`).
  - Create simple parser to detect `import` and `require` connections between files.

- [ ] **Phase 2: 3D Scene & Force-Directed Graph**
  - Setup React Three Fiber canvas (`features/scene-3d`).
  - Map files to 3D Nodes (color-coded by type: .tsx, .ts, .css) and imports to 3D Edges.
  - Add OrbitControls and smooth camera targeting on node click.

- [ ] **Phase 3: Interactive UI & AI Integration**
  - Build HUD overlay (URL Input, Preset Repos, Selected File Sidebar).
  - Connect Google Gemini API to explain selected code files in plain Persian/English.
  - Implement contextual Q&A panel for selected nodes.

---

## 🔧 Environment Variables (.env.local)
```env
GITHUB_TOKEN=your_optional_github_token
GEMINI_API_KEY=your_gemini_api_key