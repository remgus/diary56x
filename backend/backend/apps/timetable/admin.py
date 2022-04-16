from django.contrib import admin

from .models import Bell, TimetableLesson


class TimetableLessonAdmin(admin.ModelAdmin):
    list_display = ("number", "day", "klass", "subject", "classroom")
    list_filter = ("klass__school",)
    search_fields = ("number", "day", "klass", "subject", "classroom")


class BellAdmin(admin.ModelAdmin):
    list_display = ("n", "school")
    list_filter = ("school",)


admin.site.register(TimetableLesson, TimetableLessonAdmin)
admin.site.register(Bell, BellAdmin)
