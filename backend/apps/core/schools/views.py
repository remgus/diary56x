from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView

from ..models import School
from .serializers import CompactSchoolSerializer, SchoolSerializer


class SchoolsListAPIView(ListAPIView):
    """List schools."""

    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    ordering_fields = ("name",)
    pagination_class = None

    def get_serializer(self, *args, **kwargs):
        """Return compact serializer."""
        if self.request.query_params.get("compact", "False").lower() == "true":
            self.serializer_class = CompactSchoolSerializer
        return super().get_serializer(*args, **kwargs)


class SchoolDetailAPIView(RetrieveUpdateAPIView):
    """Retrieve a school."""

    queryset = School.objects.all()
    serializer_class = SchoolSerializer
