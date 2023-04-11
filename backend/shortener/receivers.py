from django.db.models.signals import pre_save
from django.dispatch import receiver

from shortener.models import Click, Link, make_alias
from shortener.signals import link_clicked
from shortener.tasks import query_geoip


@receiver(link_clicked)
def register_click(sender, link: Link, request, **_kwargs):
    click = Click.objects.create(
        link=link,
        origin_ip=request.META["HTTP_X_FORWARDED_FOR"],
        user_agent=request.META["HTTP_USER_AGENT"],
    )
    query_geoip.delay(click.id)


@receiver(pre_save, sender=Link)
def assign_alias(sender, instance: Link, **_kwargs):
    if not instance.alias:
        instance.alias = make_alias()
