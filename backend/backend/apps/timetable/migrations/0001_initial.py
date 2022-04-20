# Generated by Django 3.2.13 on 2022-04-18 18:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bell',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('n', models.IntegerField(verbose_name='Номер урока')),
                ('start', models.TimeField(verbose_name='Начало урока')),
                ('end', models.TimeField(verbose_name='Конец урока')),
                ('school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.school')),
            ],
            options={
                'verbose_name': 'Звонок',
                'verbose_name_plural': 'Звонки',
                'ordering': ['n'],
            },
        ),
        migrations.CreateModel(
            name='TimetableLesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.IntegerField(choices=[(1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (0, 'Sunday')], verbose_name='День недели')),
                ('classroom', models.CharField(max_length=50, verbose_name='Кабинет')),
                ('klass', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='core.klass', verbose_name='Класс')),
                ('number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timetable.bell', verbose_name='Номер урока')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.subject', verbose_name='Предмет')),
            ],
            options={
                'verbose_name': 'Урок',
                'verbose_name_plural': 'Уроки',
                'ordering': ['klass', 'number'],
            },
        ),
    ]