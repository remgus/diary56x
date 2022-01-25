from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

app_name = "auth"

urlpatterns = [
    path("users/", views.UserListCreateAPIView.as_view(), name="users-list"),
    path(
        "users/<int:pk>",
        views.UserRetrieveUpdateDeleteAPIView.as_view(),
        name="users-detail",
    ),
    path("users/delete", views.UserBulkDeleteAPIView.as_view(), name="users-delete"),
    path(
        "users/current", views.RetrieveCurrentUserView.as_view(), name="users-current"
    ),
    path("token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout", views.LogoutView.as_view(), name="logout"),
]
