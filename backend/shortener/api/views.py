from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    get_object_or_404,
)

from shortener.api.serializers import (
    LinkCreateSerializer,
    LinkListSerializer,
    OwnerSerializer,
)
from shortener.models import Link, Owner


class OwnerCreateAPIView(CreateAPIView):
    serializer_class = OwnerSerializer


class LinkCreateAPIView(CreateAPIView):
    serializer_class = LinkCreateSerializer


class LinkListDestroyAPIView(DestroyAPIView, ListAPIView):
    serializer_class = LinkListSerializer

    def get_object(self):
        pk = self.kwargs["pk"]
        return get_object_or_404(Owner.objects.all(), pk=pk)

    def perform_destroy(self, instance: Owner):
        instance.links.all().delete()

    def get_queryset(self):
        owner = self.kwargs["pk"]
        return Link.objects.filter(owner=owner)
