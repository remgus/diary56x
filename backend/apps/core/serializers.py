from rest_framework import serializers

from .models import Subject


class SubjectSerializer(serializers.ModelSerializer):
    """Subject serializer."""

    class Meta:
        model = Subject
        fields = "__all__"
