# Generated by Django 3.2.9 on 2021-11-19 18:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stak', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='transactioncategory',
            options={'verbose_name_plural': 'Transaction Categories'},
        ),
        migrations.AlterModelOptions(
            name='transactionsubcategory',
            options={'verbose_name_plural': 'Transaction Subcategories'},
        ),
    ]