from rest_framework import serializers

from .models import Document, Topic


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for `Document` model."""

    class Meta:
        model = Document
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    """Serializer for `Topic` model."""

    class Meta:
        model = Topic
        fields = "__all__"
