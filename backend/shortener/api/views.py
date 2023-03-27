from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView

from shortener.api.serializers import LinkCreateSerializer


class LinkCreateAPIView(CreateAPIView):
    serializer_class = LinkCreateSerializer


class LinkListAPIView(ListAPIView):
    serializer_class = LinkCreateSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        owner = self.kwargs["owner"]
        return qs.filter(owner=owner)


class LinkDestroyAPIView(DestroyAPIView):
    serializer_class = LinkCreateSerializer
