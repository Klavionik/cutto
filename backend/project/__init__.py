from project.celery import app as celery_app
from project.sentry import initialize_sentry

__all__ = ["celery_app"]

initialize_sentry()
