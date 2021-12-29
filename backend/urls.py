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
]
