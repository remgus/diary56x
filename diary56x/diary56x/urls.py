from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", TemplateView.as_view(template_name="index.html"), name="index"),
    path("api/private/auth/", include("apps.authentication.urls")),
    path("api/private/blog/", include("apps.blog.urls")),
]
