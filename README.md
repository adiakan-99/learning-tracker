# Personal Learning Tracker

## Project Structure
### Frontend (Next.js)
- **pages/**:
  - `index.tsx`: Login/Signup page
  - `dashboard.tsx`: Dashboard with resources and summary
  - `resources/add.tsx`: Add resource form
  - `resources/[id].tsx`: Resource details page
  - `api/`: API routes for authentication
- **components/**:
  - `Header.tsx`: Navigation bar
  - `ResourceCard.tsx`: Resource display
  - `FormInput.tsx`: Reusable form input
- **lib/**:
  - `api.ts`: API call utilities
- **styles/**:
  - `globals.css`: TailwindCSS styles
- **State Management**: React Query for API caching

### Backend (Django)
- **learning_tracker/**:
  - `settings.py`: Project settings
  - `urls.py`: Main URL routing
- **users/**:
  - Authentication logic (JWT via Djoser)
- **resources/**:
  - Models: Category, Resource, ProgressLog
  - APIs: List/add resources, resource details, mark complete, summary
- **Database**: PostgreSQL
  - Tables: User, Category, Resource, ProgressLog

### APIs
- `/api/auth/`: JWT signup/login
- `/api/resources/`: List (GET), add (POST)
- `/api/resources/<id>/`: Details (GET)
- `/api/resources/<id>/mark-complete/`: Mark complete (POST)
- `/api/resources/summary/`: Summary data (GET)