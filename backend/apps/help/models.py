from django.db import models


class Document(models.Model):
    """Document model."""

    content = models.TextField("Контент")
    title = models.CharField("Заголовок", max_length=100)
    topic = models.ForeignKey("Topic", models.CASCADE, verbose_name="Тема")
    priority = models.IntegerField("Приоритет", default=0)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Документ"
        verbose_name_plural = "Документы"
        ordering = ["priority", "title"]


class Topic(models.Model):
    """Topic model."""

    name = models.CharField("Название", max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тема"
        verbose_name_plural = "Темы"
        ordering = ["name"]
