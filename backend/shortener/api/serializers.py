from rest_framework import serializers

from shortener.models import Click, Link, Owner


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = "__all__"


class LinkCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = "__all__"


class LinkListSerializer(serializers.ModelSerializer):
    clicks_count = serializers.SerializerMethodField()

    class Meta:
        model = Link
        fields = ["target_url", "password", "expires_after", "alias", "clicks_count", "created_at"]

    @staticmethod
    def get_clicks_count(obj: Link):
        return obj.clicks.count()


class LinkClicksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Click
        fields = "__all__"
