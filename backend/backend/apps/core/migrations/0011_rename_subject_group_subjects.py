# Generated by Django 3.2.14 on 2022-08-08 13:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_alter_subject_icon'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group',
            old_name='subject',
            new_name='subjects',
        ),
    ]
