# Deploy AI Mystery Room

This setup runs the React site and Express API in one Docker web service. The database and Gemini API remain managed external services.

## 1. Prepare the required accounts and values

- A GitHub repository containing this project.
- A MongoDB Atlas cluster and its connection string. Add the deployment platform's outbound IP addresses in Atlas Network Access. If the platform uses changing outbound IPs, Atlas may require allowing access from anywhere (`0.0.0.0/0`); use a database user with a strong password and least privilege.
- A Google Gemini API key.
- A random session secret with at least 32 characters. Generate one in PowerShell with `-join ((1..48) | ForEach-Object { '{0:x}' -f (Get-Random -Maximum 256) })`, or use a password manager.

## 2. Push the project to GitHub

Commit and push the project, including `Dockerfile` and `.dockerignore`. Do not commit `server/.env`, `client/.env`, or any real secrets. `.gitignore` excludes these files.

## 3. Create a web service

On Render, choose **New + → Web Service**, connect the repository, and select the branch to deploy. Choose **Docker** as the runtime. The repository root is the Docker context and the `Dockerfile` is at its root. The service listens on port `5000`; Render detects this from the container's exposed port.

Other Docker-capable hosts can use the same root `Dockerfile`; configure the web service to listen on port `5000` or honor the `PORT` variable if the host assigns one.

## 4. Add environment variables in the host dashboard

Set these on the server service (never as `VITE_` variables):

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | MongoDB Atlas connection string, including database name |
| `GEMINI_API_KEY` | Your Gemini API key |
| `SESSION_SECRET` | Random string, at least 32 characters |
| `GEMINI_MODEL` | `gemini-3.8-flash` or a model available to your API key |
| `GEMINI_TIMEOUT_MS` | `60000` |
| `GEMINI_MAX_RETRIES` | `2` |
| `CLIENT_ORIGIN` | The service's public HTTPS origin, for example `https://your-service.onrender.com` |

Set `PORT` only if the host requires a fixed value. The app defaults to `5000`. Because the frontend and API share one origin, `VITE_API_BASE_URL` is unnecessary in production. Local development continues to use `client/.env.example` and `server/.env.example`.

## 5. Deploy and confirm it is live

Start the deployment. The container installs dependencies, builds the Vite app, then starts Express. Open `https://your-service-domain/` for the application and `https://your-service-domain/api/v1/health` for the API health response (`{"status":"ok"}`).

Create a case to check the full flow. If startup fails, inspect the service logs for missing environment variables or a MongoDB connection error. For Atlas connection failures, check the database user's credentials and Atlas Network Access rules. For generation failures, verify the Gemini key and model access.

## 6. Use a custom domain (optional)

Add the domain in the hosting dashboard and configure its DNS as directed by the host. Update `CLIENT_ORIGIN` to the final HTTPS origin, then redeploy. Keep HTTPS enabled so the session cookie is sent securely.

## Architecture note

The Express server serves `client/dist` when that build exists, and routes non-API paths to the React app for client-side navigation. API requests use `/api/v1` on the same host. In production, the session cookie is HTTP-only, secure, and same-site. MongoDB and Gemini credentials stay on the server.
