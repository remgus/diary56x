from django.urls import path

from .views import NotificationDetails, NotificationsList

app_name = "notifications"

urlpatterns = [
    path("", NotificationsList.as_view(), name="list"),
    path("<int:pk>/", NotificationDetails.as_view(), name="details"),
]
