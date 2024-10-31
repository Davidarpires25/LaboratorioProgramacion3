# Generated by Django 5.1.2 on 2024-10-30 18:20

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0010_alter_venta_estado'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemproducto',
            name='subtotal',
            field=models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(0.0)]),
            preserve_default=False,
        ),
    ]