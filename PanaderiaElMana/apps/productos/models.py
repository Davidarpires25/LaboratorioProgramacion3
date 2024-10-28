from django.db import models

# Create your models here.


class Producto(models.Model):

    descripcion= models.TextField(max_length=100,null=True)
    precio= models.FloatField()
    cantidad= models.FloatField()
    estado=models.BooleanField(default=True)
    categoria = models.CharField(max_length=15)


    def __str__(self):
        return f"Descripcion: {self.descripcion} Precio: {self.precio} Cantidad:{self.cantidad} Estado: {self.estado}Categorizacion: {self.categoria}"

