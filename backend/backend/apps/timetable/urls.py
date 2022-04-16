from django.urls import path

from .views import ListBellsAPIView, TimetableListAPIView

urlpatterns = [
    path("<int:pk>", TimetableListAPIView.as_view(), name="timetable-list"),
    path("bells/", ListBellsAPIView.as_view(), name="bell-list"),
]
