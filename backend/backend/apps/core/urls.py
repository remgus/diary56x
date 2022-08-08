from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .quarters import QuarterViewSet
from .groups import GroupViewSet

router = SimpleRouter(trailing_slash=False)
router.register("quarters", QuarterViewSet)
router.register("groups", GroupViewSet)

urlpatterns = [
    path("klasses/", include("backend.apps.core.klasses.urls")),
    path("subjects/", include("backend.apps.core.subjects")),
    path("", include("backend.apps.core.config")),
    path("", include(router.urls)),
]
