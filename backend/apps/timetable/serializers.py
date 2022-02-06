from backend.apps.core.subjects.serializers import SubjectSerializer
from rest_framework import serializers

from .models import Bell, TimetableLesson


class LessonCreateSerializer(serializers.ModelSerializer):
    """Lesson create serializer."""

    n = serializers.IntegerField(min_value=1)
    subject = serializers.CharField(max_length=50, allow_blank=True)
    classroom = serializers.CharField(max_length=50, allow_blank=True)

    class Meta:
        model = TimetableLesson
        fields = ["subject", "classroom", "n", "letter", "number", "day", "klass"]


class TimetableSerializer(serializers.Serializer):
    """Serializer for timetable."""

    class LessonSerializer(serializers.ModelSerializer):
        n = serializers.IntegerField(source="number.n")
        start = serializers.TimeField(source="number.start")
        end = serializers.TimeField(source="number.end")
        subject = SubjectSerializer()

        class Meta:
            model = TimetableLesson
            fields = ("n", "start", "end", "subject", "classroom", "id")

    weekday = serializers.IntegerField()
    lessons = LessonSerializer(many=True)


class BellSerializer(serializers.ModelSerializer):
    """Serializer for `Bell` model."""

    class Meta:
        model = Bell
        fields = "__all__"
