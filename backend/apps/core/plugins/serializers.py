from rest_framework import serializers

from ..models import Plugin


class PluginSerializer(serializers.ModelSerializer):
    """Serializer for `Plugin` model."""

    class Meta:
        """Meta class."""

        model = Plugin
        fields = "__all__"
