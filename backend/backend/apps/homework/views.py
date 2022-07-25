import django_filters
from rest_framework import generics, status
from rest_framework.response import Response

from .models import Homework, HomeworkAttachment
from .serializers import (
    AttachmentCreateSerializer,
    AttachmentSerializer,
    CreateHomeworkSerializer,
    HomeworkSerializer,
    UpdateHomeworkSerializer,
)


class HomeworkListCreateAPIView(generics.ListCreateAPIView):
    """List posts."""

    class HomeworkFilter(django_filters.FilterSet):
        ...

    queryset = Homework.objects.all()
    ordering_fields = ["date"]
    filter_class = HomeworkFilter

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateHomeworkSerializer
        return HomeworkSerializer

    def perform_create(self, serializer):
        return serializer.save()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        instance_serializer = HomeworkSerializer(instance)
        headers = self.get_success_headers(instance_serializer.data)
        return Response(instance_serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class HomeworkDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Homework.objects.all()

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return UpdateHomeworkSerializer
        return HomeworkSerializer
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)


class AttachmentsListCreateAPIView(generics.ListCreateAPIView):
    pagination_class = None

    def get_serializer_class(self):
        if self.request.method == "POST":
            return AttachmentCreateSerializer
        return AttachmentSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault("context", self.get_serializer_context())
        if serializer_class == AttachmentCreateSerializer:
            kwargs.setdefault("homework_id", self.kwargs["hw_pk"])
        return serializer_class(*args, **kwargs)

    def get_queryset(self):
        return HomeworkAttachment.objects.filter(homework_id=self.kwargs["hw_pk"])


class AttachmentsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AttachmentSerializer

    def get_queryset(self):
        return HomeworkAttachment.objects.filter(homework_id=self.kwargs["hw_pk"])

    def destroy(self, request, *args, **kwargs):
        """
        Destroy `HomeworkAttachment` instance.

        If the corresponding `Homework` instance has no other
        files or content attached to it, it also deletes the
        homework itself.
        """
        instance: HomeworkAttachment = self.get_object()
        hw_obj: Homework = instance.homework
        if not hw_obj.content and not hw_obj.files_attached:
            hw_obj.delete()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
