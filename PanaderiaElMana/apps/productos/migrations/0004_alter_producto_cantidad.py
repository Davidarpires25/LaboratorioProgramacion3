# Generated by Django 5.1.1 on 2024-10-30 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0003_merge_20241030_1645'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='cantidad',
            field=models.FloatField(),
        ),
    ]
