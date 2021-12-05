from rest_framework import serializers

from .models import Posts


class PostsSerializer(serializers.ModelSerializer):
    """Serializer for `Posts` model."""

    class Meta:
        model = Posts
        fields = "__all__"
