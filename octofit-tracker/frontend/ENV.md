# Frontend Environment Configuration

Create a `.env.local` file in the `octofit-tracker/frontend/` directory for Codespaces support:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

## Environment Variables

- **VITE_CODESPACE_NAME**: GitHub Codespace name (optional)
  - If set: API base URL will be `https://$VITE_CODESPACE_NAME-8000.app.github.dev/api`
  - If not set: API base URL will be `http://localhost:8000/api`

## Development

```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

The application uses `import.meta.env.VITE_CODESPACE_NAME` to automatically detect and configure API endpoints:

- **Codespaces**: Uses the official Codespaces domain
- **Localhost**: Falls back to local development server
- **Safe Fallback**: Prevents undefined URLs by checking for 'undefined' string

## API Endpoints

All components use centralized API configuration from `src/api.js`:
- `/api/users` - Users API
- `/api/activities` - Activities API
- `/api/workouts` - Workouts API
- `/api/teams` - Teams API
- `/api/leaderboard` - Leaderboard API

## Routing

The application uses React Router v6 for client-side routing:
- `/` - Dashboard
- `/users` - Users page
- `/activities` - Activities page
- `/workouts` - Workouts page
- `/teams` - Teams page
- `/leaderboard` - Leaderboard page
