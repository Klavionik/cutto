from django.urls import path

from shortener.api.views import LinkCreateAPIView, LinkDestroyAPIView, LinkListAPIView

urlpatterns = [
    path("links/", LinkCreateAPIView.as_view(), name="link_create"),
    path("owner/<uuid:pk>/links/", LinkListAPIView.as_view(), name="link_list"),
    path("links/<str:pk>/", LinkDestroyAPIView.as_view(), name="link_destroy"),
]
