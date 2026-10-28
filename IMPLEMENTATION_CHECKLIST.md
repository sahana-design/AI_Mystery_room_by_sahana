# AI Mystery Room implementation checklist

This checklist follows Phase 1–6 in `spec.md`. Phase 1 is the current scope. Later phases remain listed for sequencing and have not been audited or advanced in this pass.

## Phase 1: Repository and foundation

- [x] Inspect the existing repository and specification.
- [x] Confirm the React/Vite client and Node/Express server setup and scripts.
- [x] Validate server environment configuration from `server/.env`; keep client configuration in `client/.env` with public `VITE_` variables only.
- [x] Provide separate backend and frontend environment examples and ignore actual environment files.
- [x] Configure MongoDB connectivity through Mongoose.
- [x] Provide `GET /api/v1/health` with the specified minimal response.
- [ ] Start the client and server locally.
- [ ] Verify MongoDB connectivity at runtime.

**Exit criterion:** client and server start successfully and database connectivity is verified. Runtime verification is pending because Node.js/npm are unavailable in the current environment.

## Phase 2: Data contracts and AI service

- [ ] Define and review Zod schemas.
- [ ] Define and review Mongoose models.
- [ ] Create the versioned Gemini prompt and service.
- [ ] Implement bounded retries and mystery consistency checks.
- [ ] Create sanitized response DTOs.
- [ ] Add unit tests.

**Exit criterion:** a valid mock Gemini response validates, stores, and serializes without exposing the solution.

## Phase 3: Backend API

- [ ] Implement mystery creation and retrieval.
- [ ] Implement verdict submission and result retrieval.
- [ ] Add session handling, rate limiting, and error handling.
- [ ] Add API integration tests.

**Exit criterion:** required endpoints work against a test database.

## Phase 4: Frontend experience

- [ ] Implement landing and mystery creation pages.
- [ ] Implement loading and error states.
- [ ] Implement the investigation room, suspect profiles, evidence viewers, and timeline.
- [ ] Implement verdict submission and solution reveal.
- [ ] Make the interface responsive.

**Exit criterion:** the complete gameplay flow works with mocked backend data.

## Phase 5: Full integration

- [ ] Connect the frontend to the backend.
- [ ] Configure local environment variables.
- [ ] Verify generation, persistence, reload, and verdict flows.
- [ ] Verify pre-verdict responses do not expose the solution.
- [ ] Resolve integration issues.

**Exit criterion:** a player can complete a case from scenario submission through final reveal.

## Phase 6: Hardening and delivery

- [ ] Run unit and integration tests, linting, and the production build.
- [ ] Check keyboard navigation and responsive layouts.
- [ ] Verify environment documentation and update the README.
- [ ] Record remaining limitations.

**Exit criterion:** all P0 acceptance criteria pass, or remaining failures are reported clearly.
