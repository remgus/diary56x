# Generated by Django 3.2.10 on 2022-02-06 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_user_last_login'),
        ('core', '0006_auto_20220203_1601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='klass',
            name='teachers',
            field=models.ManyToManyField(blank=True, to='authentication.Teacher'),
        ),
    ]