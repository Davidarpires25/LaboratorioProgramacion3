# Generated by Django 5.1.2 on 2024-10-25 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0006_alter_insumo_cantidad'),
    ]

    operations = [
        migrations.AlterField(
            model_name='insumo',
            name='cantidad',
            field=models.FloatField(),
        ),
    ]
