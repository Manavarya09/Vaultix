# Finance Insights

![License](https://img.shields.io/github/license/Manavarya09/Vaultix)
![Stars](https://img.shields.io/github/stars/Manavarya09/Vaultix?style=social)
![Issues](https://img.shields.io/github/issues/Manavarya09/Vaultix)
![Forks](https://img.shields.io/github/forks/Manavarya09/Vaultix)
![Last commit](https://img.shields.io/github/last-commit/Manavarya09/Vaultix)
![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-%5E4.0-blue.svg)
![Docker Compose](https://img.shields.io/badge/Docker--Compose-enabled-blue.svg)

Comprehensive full-stack finance insights application consisting of a TypeScript backend (Node.js + Prisma) and a Next.js TypeScript frontend. This repository contains the API, worker services, and frontend UI used to ingest emails, process PDFs, and present investment insights and statements.

Table of contents
- [Key features](#key-features)
- [Repository layout](#repository-layout)
- [Getting started](#getting-started)
- [Development](#development)
- [Environment variables](#environment-variables)
- [Database & migrations](#database--migrations)
- [Running with Docker Compose](#running-with-docker-compose)
- [Testing and linting](#testing-and-linting)
- [Deployment notes](#deployment-notes)
- [Contributing](#contributing)
- [Security](#security)
- [Code of conduct](#code-of-conduct)
- [License](#license)
- [Acknowledgements](#acknowledgements)

Key features
- Backend: TypeScript, Node.js, Prisma ORM, workers for ingestion and processing.
- Frontend: Next.js with TypeScript, modular UI components and dashboard views.
- Email ingestion and PDF processing pipelines.
- Docker Compose-based local/dev orchestration.

Repository layout

- `backend/` — Node.js TypeScript API, Prisma schema, services and workers.
- `frontend/` — Next.js TypeScript application (React), UI components and pages.
- `docker-compose.yml` — Compose file for running the stack locally.
- `SPEC.md` — project specification and high-level notes.

Getting started

Prerequisites
- Node.js 16+ (or the Node version defined in the project)
- Yarn or npm
- Docker & Docker Compose (recommended for easier local runs)

Local setup (recommended using Docker Compose)

1. Copy environment files

   - Create a `.env` (and `.env.frontend`) from the provided examples or the variables below.

2. Start services with Docker Compose

```bash
docker compose up --build
```

3. Backend

- API server: http://localhost:4000 (example)
- Check `backend/` for `package.json` scripts to run locally without Docker.

4. Frontend

- App: http://localhost:3000
- Use `frontend/package.json` scripts to run dev server locally.

Development

Backend (local)

```bash
cd backend
npm install
npm run dev
```

Frontend (local)

```bash
cd frontend
npm install
npm run dev
```

Environment variables

Create `.env` files at the repo root or inside `backend/` and `frontend/` as appropriate. Example variables used by this project:

```
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PORT=4000
JWT_SECRET=replace-with-secure-secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=password

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000

```

Database & migrations

- This project uses Prisma. Migrations are stored in `backend/prisma/migrations`.
- To apply migrations locally:

```bash
cd backend
npx prisma migrate deploy
```

Running with Docker Compose

The repository provides `docker-compose.yml` at the root to run the main services together (API, frontend, DB). Example:

```bash
docker compose up --build
```

Stop and remove containers

```bash
docker compose down
```

Testing and linting

- Backend: see `backend/package.json` scripts for `test`, `lint`, and `format`.
- Frontend: see `frontend/package.json` scripts for `test`, `lint`, and `format`.

Deployment notes

- Use environment-specific secrets for production (do not commit `.env` files).
- Use a managed Postgres for production and point `DATABASE_URL` accordingly.
- When deploying, ensure workers are started (email ingestion, PDF processing).

Contributing

Please see `CONTRIBUTING.md` for our contribution guide. In short:

- Fork the repository.
- Create a feature branch: `git checkout -b feat/short-description`.
- Keep changes focused and add tests where applicable.
- Run linters and tests before opening a PR.

Security

Responsible disclosure and reporting instructions are available in `SECURITY.md`.

Code of conduct

This project follows a Code of Conduct. Please see `CODE_OF_CONDUCT.md` for details.

License

This project is licensed under the MIT License. See the `LICENSE` file for details.

Acknowledgements

- Thanks to the maintainers of the libraries used here (Next.js, Prisma, etc.).

Contact

For questions or support, open an issue or contact the maintainers via repository issues.
