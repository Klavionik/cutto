from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    get_object_or_404,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from shortener.api.serializers import (
    LinkClicksSerializer,
    LinkCreateSerializer,
    LinkListSerializer,
    OwnerSerializer,
)
from shortener.models import Click, Link, Owner


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


class AliasAvailabilityAPIView(APIView):
    def get(self, request, alias):
        if Link.objects.filter(alias=alias).exists():
            return Response(status=409)
        return Response()


class LinkClicksListAPIView(ListAPIView):
    serializer_class = LinkClicksSerializer

    def get_queryset(self):
        owner = self.kwargs["owner"]
        alias = self.kwargs["alias"]
        return Click.objects.filter(link__alias=alias, link__owner=owner)
