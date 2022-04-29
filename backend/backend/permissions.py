from rest_framework.permissions import BasePermission


class IsAdminPermission(BasePermission):
    """Allows access only to admin users."""

    def has_permission(self, request, view):
        """Check if the user is an admin."""
        return request.user.account_type in (0, 1)
