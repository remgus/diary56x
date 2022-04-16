import django_filters

from backend.apps.core.utils import MultipleValueFilter

from django.forms import IntegerField

from rest_framework import viewsets

from ..models import Subject
from .serializers import SubjectSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    """Subject view set."""

    class SubjectFilter(django_filters.FilterSet):
        """Subject filter."""

        id = MultipleValueFilter(field_class=IntegerField)

        class Meta:
            model = Subject
            fields = ["name"]

    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    pagination_class = None
    filter_class = SubjectFilter
