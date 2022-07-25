from __future__ import annotations

from backend.apps.authentication.models import Student, Teacher
from django.db import models
from django.utils.timezone import datetime


class School(models.Model):
    """School model.

    Fields:
        name (`CharField`): School name.
        full_name (`CharField`): School full (official) name.
        description (`TextField`): School description.
        plugins (`ManyToManyField`): Plugins enabled for school.
    """

    name = models.CharField("Название", max_length=100)
    plugins = models.ManyToManyField(
        "Plugin", blank=True, verbose_name="Плагины", related_name="schools"
    )
    description = models.TextField("Описание", blank=True)
    full_name = models.CharField("Официальное название", max_length=100, blank=True)

    class Meta:
        verbose_name = "Образовательное учреждение"
        verbose_name_plural = "Образовательные учреждения"
        ordering = ["name"]

    def __str__(self):
        return self.full_name if self.full_name else self.name


class Klass(models.Model):
    """Class model.

    Fields:
        name (`CharField`): Class name.
        school (`ForeignKey`): School.
        students (`ManyToManyField`): Students in class.
        teachers (`ManyToManyField`): Teachers in class.
        head_teacher (`ForeignKey`): Head teacher.
        description (`TextField`): Class description.
        subjects (`ManyToManyField`): Subjects that are studied in class.
    """

    name = models.CharField("Класс", max_length=20)
    students = models.ManyToManyField(Student, related_name="students", blank=True)
    teachers = models.ManyToManyField(Teacher, blank=True)
    head_teacher = models.ForeignKey(
        Teacher, models.SET_NULL, null=True, blank=True, related_name="managed_classes"
    )
    description = models.TextField("Описание", blank=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    subjects = models.ManyToManyField("Subject", related_name="klass")

    class Meta:
        verbose_name = "Класс"
        verbose_name_plural = "Классы"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.school})"


class Subject(models.Model):
    """Subject model.

    Fields:
        name (`CharField`): Subject name.
        description (`TextField`): Subject description.
        icon (`ImageField`): Subject icon.
    """

    name = models.CharField("Название", max_length=100)
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

    Fields:
        name (`CharField`): Plugin name.
        description (`TextField`): Plugin description.
        icon (`ImageField`): Plugin icon.
    """

    name = models.CharField("Название", max_length=100, unique=True)
    description = models.TextField("Описание", blank=True)
    icon = models.ImageField("Иконка", upload_to="plugins/", blank=True)

    class Meta:
        verbose_name = "Плагин"
        verbose_name_plural = "Плагины"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Group(models.Model):
    """Group of students.

    Fields:
        klass (`ForeignKey`): Klass.
        subject (`ForeignKey`): Subject.

    """

    klass = models.ForeignKey(Klass, on_delete=models.CASCADE, verbose_name="Класс")
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT, verbose_name="Предмет")
    students = models.ManyToManyField(Student, verbose_name="Отображаемые ученики")

    class Meta:
        verbose_name = "Группа"
        verbose_name_plural = "Группы"

    def __str__(self) -> str:
        return f"Group {self.klass} {self.subject}"


class Lesson(models.Model):
    date = models.DateField(verbose_name="Дата")
    quarter = models.ForeignKey("Quarter", on_delete=models.PROTECT, verbose_name="Четверть")
    theme = models.CharField(max_length=120, verbose_name="Тема", blank=True)
    group = models.ForeignKey(
        "Group",
        on_delete=models.PROTECT,
        verbose_name="Группа",
        null=True,
        default=None,
    )
    control = models.ForeignKey("Control", on_delete=models.PROTECT, verbose_name="Вид работы")
    is_planned = models.BooleanField(verbose_name="Запланирован", default=False)

    class Meta:
        verbose_name = "Урок"
        verbose_name_plural = "Уроки"
        ordering = ["date"]

    def __str__(self):
        return "{} {}".format(str(self.group), self.date)


class Control(models.Model):
    """
    Control model.

    Fields:
        name (`CharField`): Control's name.
        weight (`FloatField`): Control's weight.
        notify (`BooleanField`): Show if students will be notified about upcoming exams.

    """

    name = models.CharField("Вид работы", max_length=150, unique=True)
    weight = models.FloatField("Коэффицент", default=1)
    notify = models.BooleanField("Оповещать учеников о предстоящих работах", default=False)

    class Meta:
        verbose_name = "Вид работы"
        verbose_name_plural = "Виды работ"

    def __str__(self):
        return "{} ({})".format(self.name, self.weight)

    @classmethod
    def get_default(cls) -> Control | None:
        """Return the default `Control` object or `None` if it doesn't exist."""
        try:
            return cls.objects.filter(weight=1).first()
        except cls.DoesNotExist:
            return None


class Quarter(models.Model):
    QUARTERS = [(1, "I"), (2, "II"), (3, "III"), (4, "IV")]

    number = models.IntegerField(verbose_name="Четверть", choices=QUARTERS, unique=True)
    begin = models.DateField(verbose_name="Начало четверти")
    end = models.DateField(verbose_name="Конец четверти")

    class Meta:
        verbose_name = "Четверть"
        verbose_name_plural = "Четверти"
        ordering = ["number"]

    @classmethod
    def get_quarter_by_date(cls, date: str | datetime) -> None | Quarter:
        """Return a quarter by a date or a date stamp."""
        date = datetime.strptime(date, "%Y-%m-%d").date() if isinstance(date, str) else date
        for q in cls.objects.all():
            if q.begin <= date <= q.end:
                return q
        return None
