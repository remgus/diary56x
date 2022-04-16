from rest_framework.serializers import ModelSerializer

from ..models import Klass


class KlassSerializer(ModelSerializer):
    """Serializer for `Klass` model."""

    class Meta:
        model = Klass
        fields = "__all__"


class KlassCompactSerializer(ModelSerializer):
    """Serializer for `Klass` model."""

    class Meta:
        model = Klass
        fields = ["id", "name", "school", "head_teacher", "description"]
