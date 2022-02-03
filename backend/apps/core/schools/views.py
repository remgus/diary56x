from rest_framework.generics import ListAPIView

from ..models import School
from .serializers import SchoolSerializer


class SchoolsListAPIView(ListAPIView):
    """List schools."""

    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    ordering_fields = ("name",)
