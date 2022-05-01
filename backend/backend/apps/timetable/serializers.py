from backend.apps.core.subjects.serializers import SubjectSerializer
from rest_framework import serializers

from .models import Bell, TimetableLesson
from .utils import generate_bell


class LessonSerializer(serializers.ModelSerializer):
    """Serializer for TimetableLesson model."""

    n = serializers.IntegerField(source="number.n")
    start = serializers.TimeField(source="number.start")
    end = serializers.TimeField(source="number.end")
    subject = SubjectSerializer()

    class Meta:
        model = TimetableLesson
        fields = ["n", "start", "end", "subject", "classroom", "id", "group", "day"]


class BellSerializer(serializers.ModelSerializer):
    """Serializer for `Bell` model."""

    class Meta:
        model = Bell
        fields = ["id", "school", "n", "start", "end"]


class CreateLessonsSerializer(serializers.ModelSerializer):
    """Serializer for editing timetable."""

    n = serializers.IntegerField()

    class Meta:
        model = TimetableLesson
        fields = ["n", "classroom", "group", "day", "klass", "subject"]

    def create(self, validated_data):
        """Create lessons."""
        school = validated_data["klass"].school
        n = validated_data["n"]

        # Get or create a bell for the lesson
        try:
            bell = Bell.objects.get(n=n, school=school)
        except Bell.DoesNotExist:
            bell = generate_bell(n, school)

        try:
            lesson = TimetableLesson.objects.get(
                number=bell,
                group=validated_data["group"],
                day=validated_data["day"],
                klass=validated_data["klass"],
                subject=validated_data["subject"],
            )
            lesson.classroom = validated_data["classroom"]
            lesson.save()
        except TimetableLesson.DoesNotExist:
            lesson = TimetableLesson.objects.create(
                number=bell,
                group=validated_data["group"],
                day=validated_data["day"],
                klass=validated_data["klass"],
                subject=validated_data["subject"],
                classroom=validated_data["classroom"],
            )
        return lesson


class DeleteLessonSerializer(serializers.ModelSerializer):
    """Serializer for deleting lessons."""

    n = serializers.IntegerField()

    class Meta:
        model = TimetableLesson
        fields = ["n", "group", "day", "klass", "subject"]
