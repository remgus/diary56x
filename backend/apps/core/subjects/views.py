from rest_framework import viewsets

from ..models import Subject
from .serializers import SubjectSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    """Subject view set."""

    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
