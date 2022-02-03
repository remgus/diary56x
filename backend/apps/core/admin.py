from django.contrib import admin

from .models import Klass, School, Subject

admin.site.register(School)
admin.site.register(Subject)
admin.site.register(Klass)
