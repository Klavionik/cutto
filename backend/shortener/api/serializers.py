from rest_framework import serializers

from shortener.models import Link, Owner


class OwnerField(serializers.PrimaryKeyRelatedField):
    """
    PrimaryKeyRelatedField that creates a related object
    if one does not exist yet.
    """

    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError as exc:
            if exc.get_codes() == ["does_not_exist"]:
                return Owner.objects.create(pk=data)

            raise


class LinkCreateSerializer(serializers.ModelSerializer):
    serializer_related_field = OwnerField

    class Meta:
        model = Link
        fields = "__all__"


class LinkListSerializer(serializers.ModelSerializer):
    clicks_count = serializers.SerializerMethodField()

    class Meta:
        model = Link
        fields = ["target_url", "password", "expires_after", "alias", "clicks_count"]

    @staticmethod
    def get_clicks_count(obj: Link):
        return obj.clicks.count()
