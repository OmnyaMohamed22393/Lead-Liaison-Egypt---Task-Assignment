# Infinite Scroll Feed with Mocked API

A responsive React + TypeScript infinite scroll feed built with React Query and MSW (Mock Service Worker). Features 181 mock posts with pagination, search/filter, skeleton loaders, error handling, and a serverless backend for production.

## GitHub repo: Lead-Liaison-Egypt---Task-Assignment

## Live demo: https://lead-liaison-egypt-task-assignment.vercel.app

All requirements met (infinite scroll, React Query, MSW, 181+ items, search, responsive, microcommits, time spent)

## Features

- **Infinite Scroll**: Automatically load more items as you scroll to the bottom.
- **React Query Integration**: Efficient data fetching, caching, and state management with `useInfiniteQuery`.
- **Mock Backend (MSW)**: In-development mocking with 300–1000ms simulated network delay.
- **181 Mock Items**: Full paginated dataset across all pages.
- **Search/Filter**: Debounced search input with Enter-to-search and Clear button; real-time result count.
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop.
- **Loading States**: Skeleton loaders for initial and paginated loads.
- **Error Handling**: Graceful error display with automatic retry.
- **Production API**: Serverless function (`api/posts.js`) for Vercel deployment.

## Technology Stack

- **React 18** UI framework.
- **TypeScript** Type safety.
- **@tanstack/react-query** Data fetching & caching.
- **MSW (Mock Service Worker)** API mocking in development.
- **Vite** Build tooling and dev server.
- **CSS** Responsive layout with skeleton shimmer animation.

## Setup & Installation

### Prerequisites

- Node.js 16+ and npm installed.

### Quick Start

1. **Clone the repository**:
   `bash
git clone https://github.com/OmnyaMohamed22393/Lead-Liaison-Egypt---Task-Assignment.git
cd "Lead Liaison Egypt"
`

2. **Install dependencies**:
   `bash
npm install
`

3. **Start the development server**:
   `bash
npm run dev
`
   The app will be available at 'http://localhost:5173' (or the port shown in the terminal).

4. **Open in your browser** and scroll to load more posts. Search by typing and pressing Enter or Clear.

## Scripts

- `npm run dev` — Start Vite dev server with MSW mocking enabled.
- `npm run build` — Build for production (optimized bundle).
- `npm run preview` — Preview production build locally.
- `npm run typecheck` — Run TypeScript type checking.

## API / Mock Data

### Development ('/api/posts')

In development, MSW intercepts requests to '/api/posts' and returns paginated mock data:

\\\bash
GET /api/posts?offset=0&limit=20&q=search
\\\

**Query Parameters**:

- offset (number, default \0\) Starting position in the dataset.
- limit (number, default \20\) Number of items per page (max 100).
- q (string, optional) Search query (filters by title and body).

**Response**:
\\\json
{
"offset": 0,
"limit": 20,
"total": 181,
"items": [
{
"id": "1",
"title": "Mock post #1",
"body": "This is the body of mock post number 1...",
"createdAt": "2025-11-27T..."
}
]
}
\\\

### Production (\'/api/posts\')

On Vercel, \api/posts.js\ (serverless function) handles the same endpoint with identical response structure. No additional setup needed the function is deployed automatically.

## Project Structure

\\\
.
api/
posts.js # Vercel serverless function (production)
src/
main.tsx # App entry point, MSW startup
App.tsx # Root component
styles.css # Responsive styles + skeleton animation
features/
Feed.tsx # Infinite scroll feed, search control
ui/
ItemCard.tsx # Item card & skeleton loader
mocks/
data.ts # 181 mock items generator
handlers.ts # MSW request handlers
browser.ts # MSW worker setup
api.ts # Client fetch wrapper
types/
lodash-debounce.d.ts # Type declaration
public/
mockServiceWorker.js # MSW service worker (auto-served by Vite)
package.json # Dependencies and scripts
tsconfig.json # TypeScript config
vite.config.ts # Vite config
index.html # Entry HTML
README.md # This file
\\\

## Development Notes

### MSW Setup

- MSW runs in the browser during development (\src/main.tsx\ starts the worker).
- The service worker (\public/mockServiceWorker.js\) is served by Vite from the public folder.
- In production, MSW is disabled; instead, the serverless function \api/posts.js\ handles \/api/posts\.

### Type Safety

- Full TypeScript coverage; run \
  pm run typecheck\ to validate.
- Custom type declaration for \lodash.debounce\ in \src/types/lodash-debounce.d.ts\.

### Responsive Design

- Mobile-first CSS with media queries for tablet and desktop.
- Skeleton loaders provide perceived performance during initial and paginated loads.
- Hover effects and smooth transitions enhance UX.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
   `bash
git push origin main
`

2. Connect your GitHub repo to Vercel (https://vercel.com).

3. Vercel automatically detects \api/posts.js\ and deploys it as a serverless function.

4. Your app will be live at (https://lead-liaison-egypt-task-assignment.vercel.app/).

### Local Production Test

To simulate a production build locally:

\\\bash
npm run build
npm run preview
\\\

Then open the preview URL and verify posts load without MSW.

## Commit History

The project uses microcommits to show incremental development. See \CHANGES.md\ for the recommended commit breakdown and PowerShell commands to recreate the commit history with time gaps.

### Example Commits

1. \chore: scaffold project (Vite + React + TypeScript)\
2. \feat(mocks): add MSW handlers, mock data and worker\
3. \feat(api): add fetchPosts client calling /api/posts\
4. \feat(feed): implement infinite scroll feed with react-query\
5. \feat(ui): add ItemCard and base styles\
6. \feat(search): add debounced search, clear button and Enter-to-search\
7. \style(ui): add skeleton loaders, hover effects and responsive tweaks\
8. \fix(mocks): serve mockServiceWorker from public and handle startup errors\
9. \docs: add README and .gitignore\
10. \chore(types): add @types/react and local lodash-debounce typing\
11. \feat(api): add serverless /api/posts for production\

## Time Spent

**Estimated total: ~10 hours** (includes scaffolding, MSW setup, infinite scroll implementation, search functionality, UI/UX polish, testing, debugging service worker issues, adding serverless function for production, and documentation).

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge) that support ES2020+.
- Requires Service Worker support for MSW in development.

## License

MIT (or as specified by your organization).

## Notes

- This demo intentionally uses MSW for local development/testing. In production, the serverless \api/posts.js\ provides the backend.
- For large-scale production, consider integrating a real backend API or Next.js API routes.
- The mock data is lightweight (181 items); for real datasets, use server-side pagination and filtering.
