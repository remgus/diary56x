from backend.apps.core.models import Klass, School, Subject
from django.db import models


class Bell(models.Model):
    """Bell model.

    Represents lesson's number in a timetable.

    Fields:
        n (`IntegerField`): lesson number.
        start (`TimeField`): lesson start time.
        end (`TimeField`): lesson end time.
        school (`ForeignKey`): school.
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
        return "{} - Урок №{}".format(self.school.name, self.n)


class TimetableLesson(models.Model):
    """TimetableLesson model.

    Represents a lesson in a timetable.

    Fields:
        number (`ForeignKey`): `Bell` model.
        day (`CharField`): Day of the week.
        klass (`ForeignKey`): `Klass` model.
        subject (`ForeignKey`): `Subject` model.
        group (`CharField`): Group number.
    """

    WEEKDAYS = (
        (1, "Monday"),
        (2, "Tuesday"),
        (3, "Wednesday"),
        (4, "Thursday"),
        (5, "Friday"),
        (6, "Saturday"),
        (7, "Sunday"),
    )

    GROUPS = (
        (1, "I"),
        (2, "II"),
        (3, "III"),
    )

    klass = models.ForeignKey(
        Klass,
        models.CASCADE,
        related_name="lessons",
        verbose_name="Класс",
    )
    number = models.ForeignKey(Bell, models.CASCADE, verbose_name="Номер урока")
    subject = models.ForeignKey(Subject, models.CASCADE, verbose_name="Предмет")
    day = models.IntegerField("День недели", choices=WEEKDAYS)
    classroom = models.CharField("Кабинет", max_length=50)
    group = models.IntegerField("Группа", default=1, choices=GROUPS)

    class Meta:
        ordering = ["klass", "number"]
        verbose_name = "Урок"
        verbose_name_plural = "Уроки"
        unique_together = ("number", "day", "klass", "group")

    def __str__(self):
        return "{} - {} - {} ({} группа)".format(
            self.klass, self.number.n, self.subject, self.group
        )
