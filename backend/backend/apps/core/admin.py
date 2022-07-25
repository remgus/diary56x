from django.contrib import admin

from .models import Klass, Plugin, School, Subject, Lesson, Group, Control, Quarter

admin.site.register(School)
admin.site.register(Subject)
admin.site.register(Plugin)
admin.site.register(Lesson)
admin.site.register(Group)
admin.site.register(Control)
admin.site.register(Quarter)


class ClassAdmin(admin.ModelAdmin):
    """Admin configuration for `Klass` model."""

    list_display = ["name", "school", "head_teacher", "description"]
    list_filter = ["school"]
    search_fields = ["name"]
    ordering = ["name"]


admin.site.register(Klass, ClassAdmin)
