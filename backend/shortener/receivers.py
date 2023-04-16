from django.db.models.signals import pre_save
from django.dispatch import receiver

from shortener.models import Click, Link, make_alias
from shortener.signals import link_clicked
from shortener.tasks import query_geoip
from shortener.utils import get_origin_ip


@receiver(link_clicked)
def register_click(sender, link: Link, request, **_kwargs):
    click = Click.objects.create(
        link=link,
        origin_ip=get_origin_ip(request),
        user_agent=request.META["HTTP_USER_AGENT"],
    )
    query_geoip.delay(click.id)


@receiver(pre_save, sender=Link)
def assign_alias(sender, instance: Link, **_kwargs):
    if not instance.alias:
        instance.alias = make_alias()
