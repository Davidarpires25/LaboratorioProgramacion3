# Generated by Django 5.1.2 on 2024-10-25 01:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0005_remove_pedido_cantidad'),
    ]

    operations = [
        migrations.AlterField(
            model_name='insumo',
            name='cantidad',
            field=models.IntegerField(),
        ),
    ]