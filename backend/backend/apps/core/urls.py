from django.urls import include, path

urlpatterns = [
    path("klasses/", include("backend.apps.core.klasses.urls")),
    path("subjects/", include("backend.apps.core.subjects.urls")),
    path("", include("backend.apps.core.config")),
]
