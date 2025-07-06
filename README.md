# Personal Learning Tracker

## Project Structure
### Frontend (Next.js - Pages Router)
- **pages/**:
  - `index.tsx`: Login/Signup page
  - `dashboard.tsx`: Dashboard
  - `resources/add.tsx`: Add resource
  - `resources/[id].tsx`: Resource details
  - `api/auth.ts`: Authentication API route
- **components/**:
  - `Header.tsx`: Navigation bar
  - `ResourceCard.tsx`: Resource display
  - `FormInput.tsx`: Reusable form input
- **lib/**:
  - `api.ts`: API call utilities
- **styles/**:
  - `globals.css`: TailwindCSS styles
- **public/**: Static assets
- **Configuration**:
  - `postcss.config.mjs`
- **State Management**: React Query
- **Bundler**: Webpack

### Backend (Django)
- **venv/**: Virtual environment
- **learning_tracker/**:
  - `settings.py`: Project settings
  - `urls.py`: Main URL routing
- **users/**: Authentication logic (JWT via Djoser)
- **resources/**: Models (Category, Resource, ProgressLog), APIs
- **tests/**: API test documentation
- **Database**: PostgreSQL
  - Tables: User, Category, Resource, ProgressLog

### APIs
- `/api/auth/users/`: Signup (POST)
- `/api/auth/jwt/create/`: Login (POST)
- `/api/auth/users/me/`: User details (GET)
- `/api/categories/`: List/create categories (GET, POST)
- `/api/resources/`: List/create resources (GET, POST)
- `/api/resources/<id>/`: Resource details (GET)
- `/api/resources/<id>/mark_complete/`: Mark complete (POST)
- `/api/resources/summary/`: Summary data (GET)
- `/api/progress-logs/`: List/create progress logs (GET, POST)