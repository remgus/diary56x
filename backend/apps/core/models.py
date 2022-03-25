from backend.apps.authentication.models import Student, Teacher
from django.db import models


class School(models.Model):
    """A school."""

    name = models.CharField("Наименование", max_length=100)
    plugins = models.ManyToManyField(
        "Plugin", blank=True, verbose_name="Плагины", related_name="schools"
    )
    description = models.TextField("Описание", blank=True)

    class Meta:
        verbose_name = "Образовательное учреждение"
        verbose_name_plural = "Образовательные учреждения"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Klass(models.Model):
    """A class."""

    name = models.CharField("Класс", max_length=20)
    students = models.ManyToManyField(Student, related_name="students", blank=True)
    teachers = models.ManyToManyField(Teacher, blank=True)
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

    def __str__(self):
        return f"{self.name} ({self.school})"


class Subject(models.Model):
    """Subject model."""

    name = models.CharField("Название", max_length=100, unique=True)
    icon = models.ImageField("Иконка", upload_to="subjects/", blank=True)
    description = models.TextField("Описание", blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Предмет"
        verbose_name_plural = "Предметы"

    def __str__(self):
        return self.name


class Plugin(models.Model):
    """Plugin model.

    Plugins can be attached to schools. Each plugin unlocks
    functionality specific to a school it's attached to.
    """

    name = models.CharField("Название", max_length=100, unique=True)
    description = models.TextField("Описание", blank=True)
    icon = models.ImageField("Иконка", upload_to="plugins/", blank=True)
    month_price = models.PositiveIntegerField("Месячная стоимость", default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Плагин"
        verbose_name_plural = "Плагины"
        ordering = ["name"]
