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


class EditLessonSerializer(serializers.Serializer):
    """Serializer for editing timetable lessons."""

    lesson = serializers.IntegerField(min_value=1, max_value=10)
    weekday = serializers.IntegerField(min_value=0, max_value=6)
    subject = serializers.CharField(max_length=50, allow_blank=True)
    classroom = serializers.CharField(max_length=50, allow_blank=True)


class EditTimetableSerializer(serializers.Serializer):
    """Serializer for editing timetable."""

    records = EditLessonSerializer(many=True)
    klass = serializers.IntegerField(min_value=1)
