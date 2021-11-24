from django.urls import path

from . import views

app_name = "auth"

urlpatterns = [
    path("", views.UserListCreateAPIView.as_view(), name="users-list"),
    path(
        "<int:pk>",
        views.UserRetrieveUpdateDeleteAPIView.as_view(),
        name="users-detail",
    ),
    path("delete", views.UserBulkDeleteAPIView.as_view(), name="users-delete"),
    path("current", views.RetrieveCurrentUserView.as_view(), name="users-current"),
]
