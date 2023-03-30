import logging

import requests
from celery import shared_task
from django.utils.timezone import now

from shortener.models import Click, Link

log = logging.getLogger("celery")


@shared_task
def delete_expired_links():
    expired_links = Link.objects.filter(expires_after__lte=now())
    log.info(f"Find {expired_links.count()} expired links. Deleting...")

    _, deleted = expired_links.delete()

    log.info(f"Deleted {deleted.get('shortener.Link')} links.")


@shared_task(
    rate_limit="40/m",
    autoretry_for=[requests.HTTPError],
    max_retries=3,
)
def query_geoip(click_id: int):
    click = Click.objects.get(id=click_id)

    response = requests.get(
        f"http://ip-api.com/json/{click.origin_ip}?fields=status,message,country",
    )
    response.raise_for_status()

    data = response.json()

    if data["status"] == "fail":
        log.warning(f"GeoIP query for click {click_id} failed with reason: {data['message']}.")
        return

    click.country = data["country"]
    click.save(update_fields=["country"])
