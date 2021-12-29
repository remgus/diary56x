from django.urls import path

from . import views

app_name = "blog"

urlpatterns = [
    path("", views.PostsListAPIView.as_view(), name="posts-list-create"),
    path("<int:pk>", views.PostsDetailAPIView.as_view(), name="posts-detail"),
    path("create", views.PostCreateView.as_view(), name="posts-create"),
]
