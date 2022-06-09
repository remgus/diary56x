from __future__ import annotations

from backend.apps.authentication.models import Student, Teacher
from django.db import models


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


# class HomeworkAttachment(models.Model):
#     """Files that are attached to homework.

#     Fields:
#         file (`FileField`): File.
#         homework (`ForeignKey`): Homework.
#     """

#     def homework_upload(instance: HomeworkAttachment, filename: str):
#         """Return a path for a new homework attachment."""
#         return "homework/{}_{}".format(instance.id, filename)

#     file = models.FileField("Файл", upload_to=homework_upload)
#     homework = models.ForeignKey(
#           "Homework", on_delete=models.CASCADE, related_name="attachments")

#     class Meta:
#         verbose_name = "Файл к заданию"
#         verbose_name_plural = "Файлы к заданиям"


# class Homework:
#     ...


# class Group(models.Model):
#     """Group of students.

#     Fields:
#         klass (`ForeignKey`): Klass.

#     """

#     klass = models.ForeignKey(Klass, on_delete=models.CASCADE, verbose_name="Класс")
#     subject = models.ForeignKey(Subject, on_delete=models.PROTECT, verbose_name="Предмет")
#     students = models.ManyToManyField(Student, verbose_name="Отображаемые ученики")


# class Lesson(models.Model):
#     date = models.DateField(verbose_name="Дата")
#     quarter = models.ForeignKey("Quarters", on_delete=models.PROTECT, verbose_name="Четверть")
#     theme = models.CharField(max_length=120, verbose_name="Тема", blank=True)
#     group = models.ForeignKey(
#         "Groups",
#         on_delete=models.PROTECT,
#         verbose_name="Группа",
#         null=True,
#         default=None,
#     )
#     control = models.ForeignKey("Control", on_delete=models.PROTECT, verbose_name="Вид работы")
#     is_planned = models.BooleanField(verbose_name="Запланирован", default=False)

#     class Meta:
#         verbose_name = "Урок"
#         verbose_name_plural = "Уроки"
#         ordering = ["date"]

#     def __str__(self):
#         return "{} {}".format(str(self.group), self.date)


# class Control(models.Model):
#     name = models.CharField("Вид работы", max_length=150)
#     weight = models.FloatField("Коэффицент", default=1)
#     notify = models.BooleanField("Оповещать учеников", default=False)
#     default = models.BooleanField("Вид работы по умолчанию", default=False)

#     class Meta:
#         verbose_name = "Вид работы"
#         verbose_name_plural = "Виды работ"

#     def __str__(self):
#         return "{} ({})".format(self.name, self.weight)

#     @classmethod
#     def get_default(cls) -> Controls | None:
#         try:
#             return cls.objects.get(default=True)
#         except cls.DoesNotExist:
#             return None

#     def save(self, *args, **kwargs):
#         """
#         Save the current instance. This method also performs additional check that
#         there's only one model with ``default`` field set to ``True``.
#         """
#         if self.default:
#             try:
#                 temp = Controls.objects.get(default=True)
#                 if self != temp:
#                     temp.default = False
#                     temp.save()
#             except Controls.DoesNotExist:
#                 pass
#         super(Controls, self).save(*args, **kwargs)
