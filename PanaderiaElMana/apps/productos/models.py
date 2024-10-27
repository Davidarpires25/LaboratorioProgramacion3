from django.db import models

# Create your models here.


class Producto(models.Model):

    descripcion= models.TextField(max_length=100,null=True)
    precio= models.FloatField()
    cantidad= models.FloatField()
    estado=models.BooleanField(default=False)
    
    CATEGORIA_CHOICES = [
        ('PAN', 'Panificación'),  # Primer valor es el que se guarda en la BD, el segundo es el que se muestra
        ('PAS', 'Pastelería'),

    ]
    categoria = models.CharField(max_length=15, choices=CATEGORIA_CHOICES)


    def __str__(self):
        return f"{self. descripcion} (precio:{self.precio})"

#opcion: mandar esos 2 y con las expReg en js capturar el precio del option seleccionado