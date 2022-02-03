from backend.apps.authentication.models import Student, Teacher

from django.db import models


class School(models.Model):
    """A school."""

    name = models.CharField("Наименование", max_length=100)

    class Meta:
        verbose_name = "Образовательное учреждение"
        verbose_name_plural = "Образовательные учреждения"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Klass(models.Model):
    """A class."""

    name = models.CharField("Класс", max_length=20)
    students = models.ManyToManyField(Student, related_name="students")
    teachers = models.ManyToManyField(Teacher)
    head_teacher = models.ForeignKey(
        Teacher, models.SET_NULL, null=True, blank=True, related_name="managed_classes"
    )
    description = models.TextField("Описание", blank=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    subjects = models.ManyToManyField("Subject", related_name="classes")

    class Meta:
        verbose_name = "Класс"
        verbose_name_plural = "Классы"
        ordering = ["name"]


class Subject(models.Model):
    """Subject model."""

    title = models.CharField("Название", max_length=100, unique=True)
    icon = models.ImageField("Иконка", upload_to="subjects/", blank=True)
    description = models.TextField("Описание", blank=True)

    class Meta:
        ordering = ["title"]
        verbose_name = "Предмет"
        verbose_name_plural = "Предметы"

    def __str__(self):
        return self.title
