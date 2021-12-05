# Generated by Django 3.2.9 on 2021-11-25 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('author', models.CharField(max_length=50, verbose_name='Автор')),
                ('content', models.TextField(blank=True, verbose_name='Текст')),
                ('image', models.ImageField(blank=True, upload_to='news/', verbose_name='Изображение')),
                ('slug', models.SlugField(max_length=100, unique=True, verbose_name='Ссылка')),
            ],
            options={
                'verbose_name': 'Новость',
                'verbose_name_plural': 'Новости',
                'ordering': ['-date'],
            },
        ),
    ]
