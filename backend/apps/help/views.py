from rest_framework import viewsets

from .models import Document, Topic
from .serializers import DocumentSerializer, TopicSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for `Document` model."""

    model = Document
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


class TopicViewSet(viewsets.ModelViewSet):
    """ViewSet for `Topic` model."""

    model = Topic
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
