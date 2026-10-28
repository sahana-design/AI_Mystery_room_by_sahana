# AI Mystery Room

A responsive, fictional detective investigation game. Players create a case from a scenario, inspect its suspects and evidence, then submit a verdict to reveal the server-stored solution.

## Stack

- React 18, Vite, React Router
- Express 4, Mongoose, MongoDB
- Google Gemini via the official `@google/genai` SDK
- Zod request and generated-case validation

## Requirements

- Node.js 20 or newer and npm
- MongoDB (local or managed)
- A Google Gemini API key

## Setup

1. Create the frontend environment file from its example: `Copy-Item client/.env.example client/.env` in PowerShell, or `cp client/.env.example client/.env` in macOS/Linux.
2. Create the backend environment file from its example: `Copy-Item server/.env.example server/.env` in PowerShell, or `cp server/.env.example server/.env` in macOS/Linux.
3. In `client/.env`, configure only public `VITE_` settings. `VITE_API_BASE_URL` defaults to `http://localhost:5000/api/v1`.
4. In `server/.env`, configure `MONGODB_URI`, `GEMINI_API_KEY`, and a `SESSION_SECRET` of at least 32 characters. `GEMINI_MODEL` is configurable and defaults to `gemini-3.8-flash`.
5. Install dependencies from the repository root with `npm install`.

Start each service independently in its own terminal from the repository root:

```powershell
npm --prefix server run dev
```

```powershell
npm --prefix client run dev
```

Open `http://localhost:5173`. The API health check is at `http://localhost:5000/api/v1/health`. The backend loads `server/.env` and validates required configuration at startup; the Vite client loads `client/.env`. The frontend environment is for public settings only and must never contain Gemini credentials, database credentials, session secrets, or other private values.

For production, configure secrets through the deployment platform's environment-variable settings. Set `NODE_ENV=production`, use HTTPS, configure `CLIENT_ORIGIN`, and provide a managed MongoDB connection. Do not deploy or commit local `.env` files.

## API

All routes use `/api/v1` and JSON:

- `GET /health` — health status
- `POST /mysteries` — validate settings, generate and persist a case
- `GET /mysteries/:id` — retrieve the investigation DTO without private solution fields
- `POST /mysteries/:id/verdict` — record one verdict per signed anonymous session and return the reveal

The server validates Gemini output and cross-references IDs before persistence. The culprit is fixed at generation time; verdict correctness is computed against the saved culprit ID. A signed, HTTP-only cookie identifies an anonymous session, while MongoDB stores only its SHA-256 hash with a verdict.

## Project layout

```text
client/   React app and Vite configuration
server/   Express API, schemas, models, AI and verdict services
spec.md   Product and implementation specification
```

## Notes

Mysteries and all in-world evidence are fictional. Image evidence uses a clearly identified reconstruction description when no image asset is supplied. The solution and internal evidence relevance are excluded from pre-verdict API responses.
