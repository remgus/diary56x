from django.urls import path

from .views import (BellAPIView, BulkDeleteLessonsAPIView, ListBellsAPIView,
                    TimetableAPIView)

urlpatterns = [
    path("<int:pk>", TimetableAPIView.as_view(), name="timetable-list"),
    path("bulk_delete/", BulkDeleteLessonsAPIView.as_view(), name="timetable-bulk-delete"),

    path("bells/", ListBellsAPIView.as_view(), name="bell-list"),
    path("bells/<int:pk>/", BellAPIView.as_view(), name="bell-detail"),
]
