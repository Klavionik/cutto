from django.db import models
from django.utils.crypto import get_random_string


def make_alias(length=8):
    return get_random_string(length=length)


class Link(models.Model):
    alias = models.SlugField(primary_key=True, blank=True)
    target_url = models.URLField()
    password = models.CharField(max_length=12, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_after = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Link {self.alias}"


class Click(models.Model):
    origin_ip = models.GenericIPAddressField()
    created_at = models.DateTimeField(auto_now_add=True)
    link = models.ForeignKey(Link, related_name="clicks", on_delete=models.CASCADE)

    def __str__(self):
        return f"Click for {self.link.alias}"
