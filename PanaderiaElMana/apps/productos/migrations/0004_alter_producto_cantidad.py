# Generated by Django 5.1.2 on 2024-10-30 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0003_merge_20241029_1856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='cantidad',
            field=models.FloatField(),
        ),
    ]
