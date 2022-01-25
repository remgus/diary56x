from django.db import models

from backend.apps.authentication.models import Student, Teacher


class School(models.Model):
    """A school."""

    name = models.CharField("Наименование", max_length=100)

    class Meta:
        verbose_name = "Образовательное учреждение"
        verbose_name_plural = "Образовательные учреждения"
        ordering = ["name"]


class Klass(models.Model):
    """A class."""

    name = models.CharField("Класс", max_length=20)
    students = models.ManyToManyField(Student, related_name="students")
    teachers = models.ManyToManyField(Teacher)
    head_teacher = models.ForeignKey(
        Teacher, models.SET_NULL, null=True, blank=True, related_name="managed_classes"
    )

    class Meta:
        verbose_name = "Класс"
        verbose_name_plural = "Классы"
        ordering = ["name"]
