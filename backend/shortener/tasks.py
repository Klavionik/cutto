import logging

from celery import shared_task
from django.utils.timezone import now

from shortener.models import Link

log = logging.getLogger("celery")


@shared_task
def delete_expired_links():
    expired_links = Link.objects.filter(expires_after__lte=now())
    log.info(f"Find {expired_links.count()} expired links. Deleting...")

    _, deleted = expired_links.delete()

    log.info(f"Deleted {deleted.get('shortener.Link')} links.")
