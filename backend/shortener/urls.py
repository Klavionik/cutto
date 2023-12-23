from django.urls import include, path

from shortener.views import ToTargetView

app_name = "shortener"


urlpatterns = [
    path("go/<str:alias>/", ToTargetView.as_view(), name="to_target"),
    path("api/", include("shortener.api.urls")),
]
