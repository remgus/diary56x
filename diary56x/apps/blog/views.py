import django_filters

from rest_framework import generics

from .models import Posts
from .serializers import PostsSerializer


class PostsListCreateAPIView(generics.ListCreateAPIView):
    """List/create posts."""

    class PostsFilter(django_filters.FilterSet):
        date = django_filters.DateFromToRangeFilter(field_name="date")

    serializer_class = PostsSerializer
    queryset = Posts.objects.all()
    ordering_fields = ["date", "title"]
    filter_class = PostsFilter


class PostsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve/update/delete posts."""

    serializer_class = PostsSerializer
    queryset = Posts.objects.all()
