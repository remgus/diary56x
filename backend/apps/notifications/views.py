from rest_framework.generics import (CreateAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     UpdateAPIView)

from .models import Notification
from .serializers import NotificationSerializer


class MessageList(ListAPIView):
    """List all messages."""

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    ordering = ["-created_at"]


class UserMessagesList(ListAPIView):
    """List all messages sent to the current user."""

    serializer_class = NotificationSerializer

    def get_queryset(self):
        """Return all messages sent to the current user."""
        user = self.request.user
        return Notification.objects.filter(user=user)


class CreateMessage(CreateAPIView):
    """Create a new message."""

    serializer_class = NotificationSerializer


class RetrieveMessage(RetrieveUpdateDestroyAPIView):
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
