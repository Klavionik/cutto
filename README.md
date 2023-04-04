[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

# URL Shortener
A simple URL shortener made to exercise Kubernetes deployment.

## Features
* Create, edit, delete short links.
* Choose a custom alias for your short links.
* Protect short links with a password.
* Keep a track of links history and clicks statistics.

## Development
Requires:
1. Python 3.10.2
2. Poetry 1.4.1
3. Task 3.13.0
4. Node.js 16.14.0


### Backend
1. Clone the repo.
2. Run `docker compose up -d`.
3. Edit the code. `backend` directory is mounted inside the service, which will 
autoreload on change.
4. **Notice**: to apply changes to Celery tasks one must restart the worker service.

### Frontend
1. Clone the repo.
2. Change directory to `frontend`.
3. Run `npm ci`.
4. Run `npm run dev`.
