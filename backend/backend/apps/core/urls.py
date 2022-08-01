from django.urls import include, path
from rest_framework.routers import SimpleRouter

from backend.apps.core.quarters import QuarterViewSet

router = SimpleRouter(trailing_slash=False)
router.register("quarters", QuarterViewSet)

urlpatterns = [
    path("klasses/", include("backend.apps.core.klasses.urls")),
    path("subjects/", include("backend.apps.core.subjects.urls")),
    path("", include("backend.apps.core.config")),
    path("", include(router.urls))
]
