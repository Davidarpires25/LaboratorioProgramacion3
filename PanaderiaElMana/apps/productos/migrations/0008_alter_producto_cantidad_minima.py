# Generated by Django 5.1.1 on 2024-11-03 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0007_producto_cantidad_minima_producto_unidad_medida'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='cantidad_minima',
            field=models.FloatField(),
        ),
    ]
