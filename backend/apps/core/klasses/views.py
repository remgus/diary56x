import django_filters
from rest_framework.generics import ListAPIView, RetrieveAPIView

from ..models import Klass
from .serializers import KlassCompactSerializer, KlassSerializer


class KlassListAPIView(ListAPIView):
    """List all `Klass` instances."""

    class KlassFilter(django_filters.FilterSet):
        """Filter for `Klass` instances."""

        class Meta:
            model = Klass
            fields = ["school"]

    serializer_class = KlassSerializer
    queryset = Klass.objects.all()
    ordering = ["name"]
    filter_class = KlassFilter
    pagination_class = None

    def get_serializer(self, *args, **kwargs):
        """Return compact serializer."""
        if self.request.query_params.get("compact", "False").lower() == "true":
            self.serializer_class = KlassCompactSerializer
        return super().get_serializer(*args, **kwargs)


class KlassRetrieveAPIView(RetrieveAPIView):
    """Retrieve a single `Klass` instance."""

    serializer_class = KlassSerializer
    queryset = Klass.objects.all()
