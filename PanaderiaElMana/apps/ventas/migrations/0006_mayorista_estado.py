# Generated by Django 5.1.2 on 2024-10-27 03:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0005_alter_itemproducto_cantidad_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='mayorista',
            name='estado',
            field=models.BooleanField(default=False),
        ),
    ]
