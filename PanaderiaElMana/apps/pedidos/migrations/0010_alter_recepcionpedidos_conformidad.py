# Generated by Django 5.1.1 on 2024-10-29 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0009_alter_recepcionpedidos_conformidad'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recepcionpedidos',
            name='conformidad',
            field=models.BooleanField(),
        ),
    ]