from django.shortcuts import redirect

from shortener.models import Link
from shortener.signals import link_clicked


def to_target(request, alias):
    link = Link.objects.get(pk=alias)
    link_clicked.send(sender=to_target, link=link, request=request)
    return redirect(to=link.target_url)
