from django.urls import path

from shortener.api.views import (
    LinkCreateAPIView,
    LinkListDestroyAPIView,
    OwnerCreateAPIView,
)

urlpatterns = [
    path("links/", LinkCreateAPIView.as_view(), name="link_create"),
    path("owner/", OwnerCreateAPIView.as_view(), name="owner_create"),
    path("owner/<uuid:pk>/links/", LinkListDestroyAPIView.as_view(), name="link_list_destroy"),
]
