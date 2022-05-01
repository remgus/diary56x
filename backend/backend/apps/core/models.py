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
