from django.utils.timezone import datetime
from rest_framework import serializers

from ..core.models import Group, Subject

# from ..core.lessons.serializers import LessonSerializer
from .models import Homework, HomeworkAttachment


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeworkAttachment
        fields = ["id", "file", "size"]


class AttachmentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new `HomeworkAttachment` instances."""

    def __init__(self, *args, **kwargs):
        self.homework_id = kwargs.pop("homework_id")
        super().__init__(*args, **kwargs)

    def create(self, validated_data):
        return HomeworkAttachment.objects.create(homework_id=self.homework_id, **validated_data)

    class Meta:
        model = HomeworkAttachment
        fields = ["file"]


class CreateHomeworkSerializer(serializers.ModelSerializer):
    """Serializer for creating new `Homework` instances."""

    attachments = serializers.ListField(child=serializers.FileField(allow_empty_file=False))
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    date = serializers.DateField()

    class Meta:
        model = Homework
        fields = ("content", "group", "date", "attachments")

    def create(self, validated_data):
        attachments = validated_data["attachments"]
        date: datetime = validated_data["date"]
        group: Group = validated_data["group"]
        content: str = validated_data["content"]
        return Homework.add_homework(date, group, content, attachments)


class UpdateHomeworkSerializer(serializers.ModelSerializer):
    date = serializers.DateField()
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())

    class Meta:
        model = Homework
        fields = ("content", "date", "group")

    def update(self, instance: Homework, validated_data):
        date = validated_data.pop("date") if "date" in validated_data else instance.lesson.date
        group = validated_data.pop("group") if "group" in validated_data else instance.lesson.group
        instance = super().update(instance, validated_data)

        instance.lesson.date = date
        instance.lesson.group = group
        instance.lesson.save()

        return instance


class HomeworkSerializer(serializers.ModelSerializer):
    """Serializer for listing `Homework` instances."""

    attachments = AttachmentSerializer(many=True, read_only=True)
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())

    class Meta:
        model = Homework
        fields = ("id", "lesson", "content", "subject", "date", "attachments")
