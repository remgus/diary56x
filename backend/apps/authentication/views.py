import django_filters
from django.conf import settings
from rest_framework import generics, permissions, response, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    RefreshTokenSerializer,
    UserBulkDeleteSerializer,
    UserSerializer,
)
from .utils import ACCOUNT_TYPE_CHOICES


class RetrieveCurrentUserView(generics.RetrieveAPIView):
    """Retrieve current user."""

    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Get current user."""
        return self.request.user


class UserListCreateAPIView(generics.ListCreateAPIView):
    """List users or create a new user."""

    class UsersFilter(django_filters.FilterSet):
        account_type = django_filters.MultipleChoiceFilter(
            "account_type",
            choices=ACCOUNT_TYPE_CHOICES,
        )

        class Meta:
            model = User
            fields = []

    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filter_class = UsersFilter


class UserRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a user."""

    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserBulkDeleteAPIView(generics.DestroyAPIView):
    """
    Delete multiple users.

    Raises:
        Http403Forbidden: If the number of users to delete is greater than 50.
        Http400BadRequest: If the request data is invalid.

    Returns:
        Http204NoContent: If the users were deleted successfully.
    """

    serializer_class = UserBulkDeleteSerializer
    queryset = User.objects.all()

    def destroy(self, request, *args, **kwargs):
        """Delete multiple users."""
        serializer = UserBulkDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        to_delete = list(map(int, request.data["ids"].split(",")))
        if len(to_delete) > settings.REST_FRAMEWORK["PAGE_SIZE"]:
            return response.Response(status=status.HTTP_403_FORBIDDEN)
        self.get_queryset().filter(id__in=to_delete).delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        """Logout the user."""
        serializer = RefreshTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refresh_token = serializer.validated_data["refresh"]
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            raise TokenError(e)
        return Response(status=status.HTTP_205_RESET_CONTENT)