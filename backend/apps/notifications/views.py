import django_filters
from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     UpdateAPIView)

from .models import Notification
from .serializers import NotificationSerializer


class NotificationsList(ListCreateAPIView):
    """List all messages."""

    class NotificationFilter(django_filters.FilterSet):
        """Filter for notifications."""

        class Meta:
            """Meta class for filter."""

            model = Notification
            fields = ["user", "read"]

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    ordering = ["-created_at"]
    filter_class = NotificationFilter


class NotificationDetails(RetrieveUpdateDestroyAPIView):
    """Retrieve/update/destroy a message."""

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class MarkAsRead(UpdateAPIView):
    """Mark a message as read."""

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def perform_update(self, serializer):
        """Mark the message as read."""
        serializer.save(read=True)
