# Generated by Django 5.1.1 on 2024-11-03 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0006_merge_20241101_1644'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='cantidad_minima',
            field=models.FloatField(default=10),
        ),
        migrations.AddField(
            model_name='producto',
            name='unidad_medida',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]