# NXTFLIX

A web-based movie streaming discovery app. Browse, filter, and save movies to
a Watch Later list, protected behind a real sign-in flow.

## Tech Stack

- React 19
- React Router DOM 7
- Vite 7 (dev server on port `3000`, build output in `build/`)
- js-cookie (auth cookie management)
- Plain CSS (per-component `*.css` files + global tokens in `src/index.css`)

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

To build for production:

```bash
npm run build
npm run preview
```

Production output is written to `build/`.

## Test Credentials

| Email             | Password |
| ----------------- | -------- |
| admin@example.com | admin123 |

## Project Structure

```
src/
  api/
    auth.js                  # signIn(email, password) — POSTs to the auth API
  components/
    Header/                  # Sticky nav, Watch Later count badge, logout
    MovieCard/                # Poster, rating badge, title, meta, hover play icon
    MovieCarousel/            # Auto-scrolling, direction-aware, pause on hover
    GenreFilterBar/           # Genre chips, exact match filtering
    ProtectedRoute/           # Redirects to /login when no jwt_token cookie
  context/
    WatchLaterContext.jsx    # localStorage-backed Watch Later list
  data/
    movies.js                 # 50 static movies + GENRES export
  pages/
    SignIn/                   # /login
    Home/                     # / — hero, carousels, genre filters, grid
    MovieDetails/             # /movies/:id
    WatchLater/                # /watch-later
    NotFound/                 # /not-found and *
  App.jsx                     # Route definitions
  main.jsx                    # App entry, providers, router
```

## Application Flow

```
[ User Sign In ] ──> [ Protected Home ] ──> [ Movie Details ]
      |                     |                     |
      |                     +--> [ Watch Later ]   |
      |                     |                     |
      +---- [ Logout ] <----+---------------------+
```

1. **Sign In** — Users authenticate against a live API endpoint.
2. **Home** — On success, users land on the protected Home page.
3. **Browse & Filter** — Carousels plus a genre-filterable movie grid.
4. **Movie Details** — Full detail view with a Watch Later toggle.
5. **Watch Later** — Saved movies persist in `localStorage` as full objects.
6. **Logout** — Clears the `jwt_token` cookie and returns to Sign In.

## Authentication

- **Endpoint:** `POST https://serverless-api-teal.vercel.app/api/auth/signin`
- On success, the token is stored in a cookie named `jwt_token` (expires in 7
  days) via `js-cookie`, and the user is redirected to `/`.
- On failure, the API's error message is shown on the Sign In page.
- Movie data is fully static (`src/data/movies.js`) — no API or API key is
  used for movies.

## Routes

| Route          | Access    | Description                             |
| -------------- | --------- | ---------------------------------------- |
| `/login`       | Public    | Sign in — redirects to `/` if already authenticated |
| `/`            | Protected | Home — requires a `jwt_token` cookie     |
| `/movies/:id`  | Protected | Movie detail view                        |
| `/watch-later` | Protected | Saved Watch Later list                   |
| `/not-found`   | Public    | Explicit 404 page (no Header)            |
| `*`            | Public    | Catch-all 404 page (no Header)           |

## Deployment

This is a standard Vite app and deploys as-is to Vercel or Netlify:

- **Build command:** `npm run build`
- **Output directory:** `build`
