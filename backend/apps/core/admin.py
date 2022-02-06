from django.contrib import admin

from .models import Klass, Plugin, School, Subject

admin.site.register(School)
admin.site.register(Subject)
admin.site.register(Plugin)


class ClassAdmin(admin.ModelAdmin):
    """Admin configuration for `Klass` model."""

    list_display = ["name", "school", "head_teacher", "description"]
    list_filter = ["school"]
    search_fields = ["name"]
    ordering = ["name"]


admin.site.register(Klass, ClassAdmin)
