from backend.apps.core.models import Klass, School, Subject

from django.db import models


class TimeTable(models.Model):
    """TimeTable model."""

    school = models.OneToOneField(School, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "TimeTable"
        verbose_name_plural = "TimeTables"

    def __str__(self):
        return self.school.name


class Bell(models.Model):
    """Bell model.

    Each bell is a lesson in a school day.
    """

    timetable = models.ForeignKey("TimeTable", on_delete=models.CASCADE)
    n = models.IntegerField(verbose_name="Номер урока")
    start = models.TimeField(verbose_name="Начало урока")
    end = models.TimeField(verbose_name="Конец урока")

    class Meta:
        ordering = ["timetable", "n"]
        verbose_name = "Звонок"
        verbose_name_plural = "Звонки"

    def __str__(self):
        return "{} - Урок №{}".format(self.timetable, self.n)


class Lesson(models.Model):
    """Lesson model."""

    WEEKDAYS = (
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
    )

    klass = models.ForeignKey(
        Klass,
        on_delete=models.CASCADE,
        related_name="lessons",
        verbose_name="Класс",
    )
    day = models.IntegerField("День недели", choices=WEEKDAYS)
    number = models.ForeignKey(
        Bell, on_delete=models.CASCADE, verbose_name="Номер урока"
    )
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, verbose_name="Предмет"
    )
    classroom = models.CharField(max_length=50, verbose_name="Кабинет")
