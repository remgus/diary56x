import django_filters
from rest_framework import generics

from .models import Posts
from .serializers import PostCreateSerializer, PostSerializer


class PostCreateView(generics.CreateAPIView):
    """Create a new post."""

    serializer_class = PostCreateSerializer


class PostsListAPIView(generics.ListAPIView):
    """List posts."""

    class PostsFilter(django_filters.FilterSet):
        date = django_filters.DateFromToRangeFilter(field_name="date")
        search = django_filters.CharFilter(field_name="title", method="perform_search")

        # NOTE: In debug mode search filter is not working because of SQLite3 restrictions.

        def perform_search(self, queryset, name, value):
            """Search posts by title and content."""
            return queryset.filter(title__icontains=value) | queryset.filter(
                content__icontains=value
            )

    serializer_class = PostSerializer
    queryset = Posts.objects.all()
    ordering_fields = ["date", "title"]
    filter_class = PostsFilter


class PostsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve/update/delete posts."""

    serializer_class = PostSerializer
    queryset = Posts.objects.all()
