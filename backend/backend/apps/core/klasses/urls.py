from django.urls import path

from .views import KlassListAPIView, KlassRetrieveAPIView

urlpatterns = [
    path("", KlassListAPIView.as_view(), name="klass-list"),
    path("<int:pk>", KlassRetrieveAPIView.as_view(), name="klass-detail"),
]
