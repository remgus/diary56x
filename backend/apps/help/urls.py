from django.urls import path

from .views import DocumentViewSet, TopicViewSet

document_list = DocumentViewSet.as_view({"get": "list", "post": "create"})

document_detail = DocumentViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

topic_list = TopicViewSet.as_view({"get": "list", "post": "create"})

topic_detail = TopicViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

urlpatterns = [
    path("", document_list, name="document-list"),
    path("<int:pk>/", document_detail, name="document-detail"),
    path("topics/", topic_list, name="topic-list"),
    path("topics/<int:pk>/", topic_detail, name="topic-detail"),
]
