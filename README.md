# Habit Tracker — Frontend

A React-based frontend for the Habit Tracker application. Users can register, log in, create and manage habits, track daily check-ins, and view personal statistics.

## Tech Stack

- **React 19** — UI library
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — styling
- **React Router v7** — client-side routing

## Features

- Register and login with JWT authentication
- View all active habits on the dashboard
- Mark habits as completed for today
- Create, edit, and archive habits
- View habit statistics (current streak, longest streak, weekly completion)
- Restore archived habits
- Logout

## Project Structure

```
src/
  entities/         # Base UI components (HabitEntitie)
  features/         # Business logic components (AddHabitFeature, EditHabitFeature, etc.)
  widgets/          # Composite components (HeaderWidget, AllHabitsWidget, etc.)
  page/             # Pages (MainPage, AuthPage)
  shared/
    api/            # API client and auth requests
    lib/            # Auth utilities (token management)
    ui/             # Shared UI (PrivateRoute)
```

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed and running
- Backend repository cloned and running (see backend README)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Wwdebil/habit-tracker-frontend.git
cd habit-tracker-frontend
```

### 2. Make sure the backend is running

The frontend expects the backend to be available at `http://localhost:8080`.

Clone and start the backend first:

```bash
git clone <BACKEND_REPO_URL>
cd habit-tracker-api
docker compose up --build
```

### 3. Start the frontend with Docker

```bash
docker compose up --build
```

The app will be available at **http://localhost:5173**

### 4. Stop the app

```bash
docker compose down
```

## Running without Docker

If you prefer to run locally without Docker:

```bash
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

## Environment

The API base URL is set to `http://localhost:8080/api` inside `src/shared/api/apiClient.js` and `src/shared/api/authApi.js`.

If the backend runs on a different port, update `BASE_URL` in both files.

## Authentication

- JWT token is saved in `localStorage` after register/login
- All protected API requests include `Authorization: Bearer <token>` automatically
- If the token is missing or expired, the user is redirected to `/login`
- Logout removes the token and redirects to `/login`
