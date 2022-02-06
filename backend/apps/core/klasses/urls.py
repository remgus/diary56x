from django.urls import path

from .views import KlassListAPIView


urlpatterns = [
    path("", KlassListAPIView.as_view(), name="klass-list"),
    path("<int:pk>/", KlassListAPIView.as_view(), name="klass-detail"),
]
