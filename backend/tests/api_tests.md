# API Tests
## Authentication APIs
- Signup: POST /api/auth/users/ - Success (201, user created)
- Login: POST /api/auth/jwt/create/ - Success (200, tokens returned)
- User Details: GET /api/auth/users/me/ - Success (200, user data)

## Resource APIs
- Create Category: POST /api/categories/ - Success (201, category created)
- Create Resource: POST /api/resources/ - Success (201, resource created)
- List Resources: GET /api/resources/ - Success (200, resource list)
- Mark Complete: POST /api/resources/1/mark_complete/ - Success (200, marked)
- List Progress Logs: GET /api/progress-logs/ - Success (200, log list)
- Summary: GET /api/resources/summary/ - Success (200, summary data)