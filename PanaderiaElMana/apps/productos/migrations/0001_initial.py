# Generated by Django 5.1.1 on 2024-10-23 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.TextField(max_length=100, null=True)),
                ('precio', models.FloatField()),
                ('cantidad', models.FloatField()),
                ('estado', models.BooleanField(default=False)),
                ('categoria', models.CharField(choices=[('PAN', 'Panificación'), ('PAS', 'Pastelería')], max_length=15)),
            ],
        ),
    ]
