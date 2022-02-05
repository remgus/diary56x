from rest_framework.generics import ListAPIView, RetrieveAPIView

from ..models import Plugin
from .serializers import PluginSerializer


class PluginListView(ListAPIView):
    """List plugins."""

    queryset = Plugin.objects.all()
    serializer_class = PluginSerializer


class PluginDetailView(RetrieveAPIView):
    """Detail plugin."""

    queryset = Plugin.objects.all()
    serializer_class = PluginSerializer
