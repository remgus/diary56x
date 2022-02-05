from django.urls import path

from .views import SchoolDetailAPIView, SchoolsListAPIView

urlpatterns = [
    path("", SchoolsListAPIView.as_view(), name="list"),
    path("<int:pk>/", SchoolDetailAPIView.as_view(), name="detail"),
]
