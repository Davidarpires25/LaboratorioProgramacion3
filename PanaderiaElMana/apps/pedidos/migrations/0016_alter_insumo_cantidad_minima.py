# Generated by Django 5.1.1 on 2024-11-01 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0015_insumo_cantidad_minima_alter_pedido_fecha_pedido_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='insumo',
            name='cantidad_minima',
            field=models.FloatField(),
        ),
    ]