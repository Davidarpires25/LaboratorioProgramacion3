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
    

    def __str__(self):
        return f"Descripcion: {self.descripcion} Precio: {self.precio} Cantidad:{self.cantidad} Estado: {self.estado}Categorizacion: {self.CATEGORIA_CHOICES}"

