from rest_framework import serializers

from ..models import School


class SchoolSerializer(serializers.ModelSerializer):
    """School serializer."""

    class Meta:
        model = School
        fields = "__all__"
