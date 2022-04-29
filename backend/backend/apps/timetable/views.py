import django_filters
from backend.apps.core.models import Klass
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import (
    DestroyAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.response import Response

from .models import Bell, TimetableLesson
from .serializers import (
    BellSerializer,
    CreateLessonsSerializer,
    DeleteLessonSerializer,
    LessonSerializer,
)


class TimetableAPIView(ListCreateAPIView):
    """List lessons for a specified class or edit the timetable."""

    pagination_class = None

    def get_queryset(self):
        """Return timetable for klass."""
        klass = get_object_or_404(Klass, id=self.kwargs["pk"])
        return TimetableLesson.objects.filter(klass=klass)

    def get_serializer_class(self):
        """Return serializer class."""
        if self.request.method == "POST":
            return CreateLessonsSerializer
        return LessonSerializer

    def create(self, request, *args, **kwargs):
        """Create multiple timetable records."""
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"status": "ok"}, status.HTTP_201_CREATED)


class BulkDeleteLessonsAPIView(DestroyAPIView):
    """Delete multiple lessons."""

    queryset = TimetableLesson.objects.all()
    serializer_class = DeleteLessonSerializer

    def destroy(self, request, *args, **kwargs):
        """Delete multiple lessons."""
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        to_delete = []
        for lesson in serializer.validated_data:
            try:
                lsn = TimetableLesson.objects.get(
                    number__n=lesson["n"],
                    group=lesson["group"],
                    day=lesson["day"],
                    klass=lesson["klass"],
                )
                to_delete.append(lsn.id)
            except TimetableLesson.DoesNotExist:
                pass
        TimetableLesson.objects.filter(id__in=to_delete).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListBellsAPIView(ListAPIView):
    """List bells."""

    serializer_class = BellSerializer
    queryset = Bell.objects.all()

    class BellsFilter(django_filters.FilterSet):
        """Filter bells."""

        class Meta:
            model = Bell
            fields = ["school"]


class BellAPIView(RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a bell."""

    queryset = Bell.objects.all()
    serializer_class = BellSerializer
