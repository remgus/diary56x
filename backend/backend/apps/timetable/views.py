from backend.apps.core.models import Klass
from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Bell, TimetableLesson
from .serializers import (
    BellSerializer,
    EditTimetableSerializer,
    TimetableSerializer,
)


def get_timetable(lessons: QuerySet[TimetableLesson]):
    """Transform lessons to timetable."""
    return [
        {"weekday": weekday, "lessons": lessons.filter(day=weekday)}
        for weekday in list(range(1, 7)) + [0]
    ]


class TimetableListAPIView(ListAPIView):
    """List timetable."""

    serializer_class = TimetableSerializer

    def get_queryset(self):
        """Return timetable for klass."""
        klass = get_object_or_404(Klass, id=self.kwargs["pk"])
        return TimetableLesson.objects.filter(klass=klass)

    def list(self, request, *args, **kwargs):
        """Return timetable for klass."""
        qs = self.get_queryset()
        output = get_timetable(qs)
        serializer = self.get_serializer(output, many=True)
        return Response(serializer.data)


class ListBellsAPIView(ListAPIView):
    """List bells."""

    serializer_class = BellSerializer
    queryset = Bell.objects.all()


class EditTimetableView(APIView):
    def post(self):
        serializer = EditTimetableSerializer(data=self.request.data, many=True)
        serializer.is_valid(raise_exception=True)

        bells = Bell.objects.all()

        for record in serializer.validated_data["records"]:
            TimetableLesson.objects.update_or_create(
                number__n=record["lesson"],
                day=record["weekday"],
                klass_id=serializer.validated_data["klass"],
                classroom=record["classroom"],
                subject=record["subject"],
            )
        

