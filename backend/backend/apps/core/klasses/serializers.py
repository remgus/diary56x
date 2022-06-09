from rest_framework.serializers import ModelSerializer

from ..models import Klass


class KlassSerializer(ModelSerializer):
    """Serializer for `Klass` model.

    Fields: `name`, `school`, `students`, `teachers`,
    `head_teacher`, `description`, `subjects`

    """

    class Meta:
        model = Klass
        fields = "__all__"


class KlassCompactSerializer(ModelSerializer):
    """Serializer for `Klass` model.

    Fields: `id`, `name`, `school`, `head_teacher`, `description`
    """

    class Meta:
        model = Klass
        fields = ["id", "name", "school", "head_teacher", "description"]
