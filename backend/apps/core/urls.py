from django.urls import include, path

urlpatterns = [
    path("schools/", include("backend.apps.core.schools.urls")),
]
