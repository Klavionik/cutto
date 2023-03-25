from django.urls import path

from shortener.views import to_target

app_name = "shortener"

urlpatterns = [path("<str:alias>/", to_target, name="to_target")]
