from django.urls import path

from .views import PluginDetailView, PluginListView

urlpatterns = [
    path("", PluginListView.as_view()),
    path("<int:pk>/", PluginDetailView.as_view()),
]
