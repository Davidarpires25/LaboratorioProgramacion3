from django.db import models

# Create your models here.

class Proveedor(models.Model):
    nombre= models.TextField(max_length=50, primary_key=True)
    estado=models.BooleanField(False)

    def __str__(self):
        return f"Nombre: {self. nombre}Estado: {self.estado}"





class Insumo(models.Model):

    descripcion= models.TextField(max_length=100,null=True)
    precio= models.FloatField()
    cantidad= models.FloatField()
    estado=models.BooleanField(default=False)

    def __str__(self):
        return f"Descripcion: {self.descripcion} Precio: {self.precio,} Cantidad:{self.cantidad} Estado: {self.estado}"





class Pedido(models.Model):

    fechaPedido= models.DateField()
    observaciones= models.TextField(max_length=100 ,blank=True, null=True)
    cantidad= models.FloatField(blank=False)
    insumos= models.ManyToManyField(Insumo)
    proveedor= models.ForeignKey(Proveedor,on_delete=models.CASCADE)

    def __str__(self):
        return f"Fecha de pedido: {self.fechaPedido} Observaciones: {self.observaciones,} Cantidad:{self.cantidad} proveedor: {self.proveedor.nombre}"


   