from django.dispatch import receiver

from shortener.models import Click
from shortener.signals import link_clicked


@receiver(link_clicked)
def register_click(sender, link, request, **kwargs):
    Click.objects.create(link=link, origin_ip=request.META["REMOTE_ADDR"])
