from django.http import HttpResponse
from django.urls import path

from shortener.api.views import (
    AliasAvailabilityAPIView,
    LinkClicksListAPIView,
    LinkCreateAPIView,
    LinkListDestroyAPIView,
    OwnerCreateAPIView,
    OwnerRetrieveAPIView,
)


def healthz(_):
    return HttpResponse("OK")


urlpatterns = [
    path("links/", LinkCreateAPIView.as_view(), name="link_create"),
    path("owner/", OwnerCreateAPIView.as_view(), name="owner_create"),
    path("owner/<uuid:pk>/", OwnerRetrieveAPIView.as_view(), name="owner_retrieve"),
    path("owner/<uuid:pk>/links/", LinkListDestroyAPIView.as_view(), name="link_list_destroy"),
    path(
        "owner/<uuid:owner>/links/<slug:alias>/clicks/",
        LinkClicksListAPIView.as_view(),
        name="link_clicks_list",
    ),
    path("alias-availablity/<slug:alias>/", AliasAvailabilityAPIView.as_view()),
    path("healthz/", healthz, name="health"),
]
