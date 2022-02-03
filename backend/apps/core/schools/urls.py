from django.urls import path

from .views import SchoolsListAPIView

urlpatterns = [
    path("", SchoolsListAPIView.as_view(), name="list"),
]
