Copilot instructions — Blink repository

Build, test, and lint (how to run)

- Root (convenience):
  - Full build (installs both packages and builds frontend):
    - npm run build
  - Start backend (production):
    - npm run start

- Frontend (React + Vite):
  - Dev server: npm run dev --prefix frontend
  - Build: npm run build --prefix frontend
  - Lint: npm run lint --prefix frontend

- Backend (Express):
  - Dev (nodemon): npm run dev --prefix backend
  - Start (node): npm run start --prefix backend

- Tests: No test runner is currently configured in this repo. When tests are added, run them from the package where they live (e.g., npm test --prefix frontend). To run a single test with common runners:
  - Jest: npx jest path/to/file.test.js  OR  npm test -- -t "test name"
  - Mocha: npx mocha path/to/file.test.js

High-level architecture (big picture)

- Monorepo-like layout with two active workspaces:
  - frontend/ — React + Vite + Tailwind; state with zustand; components in src/components, pages in src/pages, store in src/store. Frontend publishes a static build (vite) under dist/ or public/.
  - backend/ — Node/Express REST + Socket.IO; Mongoose models in src/models; controllers in src/controllers; routes in src/routes; lib utilities in src/lib; middleware in src/middleware. backend/src/index.js is the server entry.
- Deployment convention: the root build script installs both frontend and backend deps and builds the frontend; backend/public contains static assets (backend includes a public/ folder with prebuilt frontend assets in repo history).
- PWA & service worker: frontend includes service-worker.js and a vite-plugin-pwa dependency; public/ contains PWA assets and manifest.
- backup/ — present in repo as an archive; do NOT modify for active development.

Key conventions (project-specific patterns)

- agent.md is the authoritative AI assistant handbook. Consult it for task priorities and workspace rules.
- tasks.md, frontend/tasks.md, backend/tasks.md list prioritized work and expectations. Update them when adding features or blocking changes.
- Environment variables:
  - Keep secrets out of source control. Use .env and keep .env.example updated with any new variables.
  - backend/.env is used for server configuration; document any additions in .env.example.
- Directory responsibilities:
  - Keep UI concerns inside frontend/ and server concerns inside backend/; avoid cross-cutting code outside these folders.
  - Controllers handle request flow and validation; services encapsulate business logic; models define Mongoose schemas.
- Scripts and prefixes:
  - Use npm run <script> --prefix <workspace> to run workspace-local scripts from repo root. The root package.json coordinates cross-workspace tasks.
- Linting:
  - Frontend has an eslint script. Run npm run lint --prefix frontend and follow the eslint.config.js at repo root.

Files to consult (authoritative):
- agent.md — AI assistant handbook and workflow
- tasks.md, frontend/tasks.md, backend/tasks.md — project priorities and TODOs
- folder-structure.txt — quick map of repository layout
- frontend/package.json, backend/package.json — workspace scripts and dev dependencies

Other AI config files

- No CLAUDE.md, AGENTS.md, or other assistant configs were found; agent.md is the only assistant-specific doc to follow.

MCP servers

- This is a web app (frontend + backend). Would you like me to configure an MCP server (e.g., Playwright test runner) for browser-based testing and interactions? Reply yes to proceed and specify preferences (headless vs headed, browsers).

Summary

- Added .github/copilot-instructions.md summarizing build/lint commands, architecture, and repo-specific conventions. Ask to adjust scope or add coverage for tests, CI, or deployment instructions.
