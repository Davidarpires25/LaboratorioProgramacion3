# Generated by Django 5.1.1 on 2024-10-18 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='cuit',
            field=models.IntegerField(null=True),
        ),
    ]
