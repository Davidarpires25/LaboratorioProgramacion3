# Generated by Django 5.1.1 on 2024-10-29 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0008_recepcionpedidos_precio_total_alter_insumo_estado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recepcionpedidos',
            name='conformidad',
            field=models.CharField(choices=[('Si', 'Si'), ('No', 'No')], max_length=2),
        ),
    ]
