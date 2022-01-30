from django.db import models

from backend.apps.authentication.models import User


class Notification(models.Model):
    """
    Notification model.

    Messages that can be sent from admininstrators to other users.
    """

    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)
    title = models.CharField(max_length=255, default="")
