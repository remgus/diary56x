from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView

index_view = never_cache(TemplateView.as_view(template_name="index.html"))

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html"), name="index"),
    path("admin/", admin.site.urls),
    path("api/private/auth/", include("backend.apps.authentication.urls")),
    path("api/private/blog/", include("backend.apps.blog.urls")),
    path("api/private/notifications/", include("backend.apps.notifications.urls")),
    path("api/private/timetable/", include("backend.apps.timetable.urls")),
    path("api/private/help/", include("backend.apps.help.urls")),
    path("api/private/", include("backend.apps.core.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
