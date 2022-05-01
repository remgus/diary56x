from rest_framework import serializers

from ..models import Subject


class SubjectSerializer(serializers.ModelSerializer):
    """Serializer for `Subject` model."""

    class Meta:
        model = Subject
        fields = ("id", "name", "description", "icon")
