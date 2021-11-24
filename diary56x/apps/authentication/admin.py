from django.contrib import admin

from .models import Students, Teachers, Users


class UserAdmin(admin.ModelAdmin):
    """User admin configuration."""

    list_display = ("email", "first_name", "surname", "last_login")
    list_filter = ("account_type", "last_login")


admin.site.register(Users, UserAdmin)
admin.site.register(Students)
admin.site.register(Teachers)
