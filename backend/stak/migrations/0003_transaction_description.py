# Generated by Django 3.2.9 on 2022-05-14 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stak', '0002_auto_20211119_1819'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='description',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
