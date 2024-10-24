from django.db import models

# Create your models here.

class Proveedor(models.Model):
    cuit= models.CharField(max_length=11,primary_key=True)
    nombre= models.TextField(max_length=50)
    email= models.CharField(max_length=50)
    direccion= models.TextField(max_length=50)
    telefono= models.CharField(max_length=20)
    estado=models.BooleanField(False)

    def __str__(self):
        return f"Nombre: {self. nombre}Estado: {self.estado}"





class Insumo(models.Model):

    descripcion= models.TextField(max_length=100,null=True)
    cantidad= models.FloatField()
    estado=models.BooleanField(default=False)

    def __str__(self):
        return f"Descripcion: {self.descripcion} Precio: {self.precio,} Cantidad:{self.cantidad} Estado: {self.estado}"





class Pedido(models.Model):

    fecha_pedido= models.DateField(auto_now=True)
    observaciones= models.TextField(max_length=100 ,blank=True, null=True)
    cantidad= models.FloatField(blank=False)
    insumos= models.ManyToManyField(Insumo)
    proveedor= models.ForeignKey(Proveedor,on_delete=models.CASCADE)
    

    def __str__(self):
        return f"Fecha de pedido: {self.fechaPedido} Observaciones: {self.observaciones,} Cantidad:{self.cantidad} proveedor: {self.proveedor.nombre}"



class ItemInsumo():
    pedido= models.ForeignKey(Pedido, on_delete=models.CASCADE)
    Insumo= models.ForeignKey(Insumo, on_delete=models.CASCADE)
    cantidad= models.IntegerField()
    precio= models.FloatField()


class recepcionPedidos():
    fecha_llegada=models.DateField(auto_now=True)
    observacion= models.TextField(max_length=100 ,blank=True, null=True)
    conformidad= models.BooleanField()
    pedido= models.ForeignKey(Pedido,on_delete=models.CASCADE)
    