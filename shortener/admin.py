from django.contrib import admin

from .models import Click, Link

admin.site.register(Link)
admin.site.register(Click)
