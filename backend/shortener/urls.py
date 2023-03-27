from django.urls import include, path

from shortener.views import to_target

app_name = "shortener"

urlpatterns = [
    path("go/<str:alias>/", to_target, name="to_target"),
    path("api/", include("shortener.api.urls")),
]
