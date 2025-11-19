# Task Dashboard

A task management web app for creating, editing, updating, and deleting tasks. Built with Next.js App Router, React, Ant Design, and Turso (distributed SQLite). Live demo: [https://task-daskboard.vercel.app/](https://task-daskboard.vercel.app/)

## Features

- Task list with sorting by due date.
- Add tasks via modal form with validation.
- Edit tasks in pre-filled modals.
- Delete tasks with confirmation.
- Server Actions for mutations and revalidation.
- Optimistic UI updates using React useTransition.
- Responsive design.

## Tech Stack

- Next.js 16.0.1 (App Router, Server Components).
- React 19.2.0 (useTransition, useEffect).
- Ant Design 5.28.1 (forms, modals, buttons).
- Turso (@libsql/client) for database.
- TypeScript 5 for type safety.
- Bun for development.
- Vercel for deployment.

## Installation

1. Clone: `git clone <repo-url>`
2. Install: `bun install`
3. Env: Add `.env.local` with `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`.
4. Run: `bun dev`

## Usage

- Fetch tasks server-side in pages.
- Use Client Components for modals and state.
- Mutations via Server Actions with revalidatePath.

MIT License.
