import django_filters

from rest_framework.generics import ListAPIView, RetrieveAPIView

from ..models import Plugin
from .serializers import PluginSerializer


class PluginListView(ListAPIView):
    """List plugins."""

    class PluginFilter(django_filters.FilterSet):
        """Filter plugins."""

        class Meta:
            model = Plugin
            fields = ["schools"]

    queryset = Plugin.objects.all()
    serializer_class = PluginSerializer
    filter_class = PluginFilter


class PluginDetailView(RetrieveAPIView):
    """Detail plugin."""

    queryset = Plugin.objects.all()
    serializer_class = PluginSerializer
