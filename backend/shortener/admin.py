from django.contrib import admin

from .models import Click, Link, Owner

admin.site.register(Link)
admin.site.register(Click)
admin.site.register(Owner)
