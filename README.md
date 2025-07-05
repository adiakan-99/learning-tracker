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
- **Database**: PostgreSQL
  - Tables: User, Category, Resource, ProgressLog

### APIs
- `/api/auth/`: JWT signup/login
- `/api/resources/`: List (GET), add (POST)
- `/api/resources/<id>/`: Details (GET)
- `/api/resources/<id>/mark-complete/`: Mark complete (POST)
- `/api/resources/summary/`: Summary data (GET)