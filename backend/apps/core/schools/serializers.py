from rest_framework import serializers

from ..models import School
from ..plugins.serializers import PluginSerializer


class SchoolSerializer(serializers.ModelSerializer):
    """School serializer."""

    plugins = PluginSerializer(many=True)

    class Meta:
        model = School
        fields = "__all__"


class CompactSchoolSerializer(serializers.ModelSerializer):
    """Compact school serializer."""

    class Meta:
        model = School
        fields = ["id", "name"]
