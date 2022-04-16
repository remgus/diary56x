from django.urls import include, path

urlpatterns = [
    path("schools/", include("backend.apps.core.schools.urls")),
    path("klasses/", include("backend.apps.core.klasses.urls")),
    path("plugins/", include("backend.apps.core.plugins.urls")),
    path("subjects/", include("backend.apps.core.subjects.urls")),
]
