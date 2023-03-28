from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import View

from shortener.forms import LinkPasswordForm
from shortener.models import Link
from shortener.signals import link_clicked


class ToTargetView(View):
    def get(self, request, alias):
        link = get_object_or_404(Link, pk=alias)
        link_clicked.send(sender=ToTargetView, link=link, request=request)

        if link.password:
            return render(request, "shortener/protected_link.html", context={"alias": alias})
        return redirect(to=link.target_url)

    def post(self, request, alias):
        link = get_object_or_404(Link, pk=alias)
        form = LinkPasswordForm(data=request.POST, link=link)

        if form.is_valid():
            return redirect(to=link.target_url)
        return render(
            request, "shortener/protected_link.html", context={"form": form, "alias": alias}
        )
