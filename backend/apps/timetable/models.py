from backend.apps.core.models import Klass, School, Subject

from django.db import models


class Bell(models.Model):
    """Bell model.

    Represents lesson's number in a timetable.
    """

    school = models.ForeignKey(School, on_delete=models.CASCADE)
    n = models.IntegerField(verbose_name="Номер урока")
    start = models.TimeField(verbose_name="Начало урока")
    end = models.TimeField(verbose_name="Конец урока")

    class Meta:
        ordering = ["n"]
        verbose_name = "Звонок"
        verbose_name_plural = "Звонки"

    def __str__(self):
        return "{} - Урок №{}".format(self.timetable, self.n)


class TimetableLesson(models.Model):
    """TimetableLesson model.

    Represents a lesson in a timetable.
    """

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
    number = models.ForeignKey(
        Bell, on_delete=models.CASCADE, verbose_name="Номер урока"
    )
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, verbose_name="Предмет"
    )
    day = models.IntegerField("День недели", choices=WEEKDAYS)
    classroom = models.CharField(max_length=50, verbose_name="Кабинет")
