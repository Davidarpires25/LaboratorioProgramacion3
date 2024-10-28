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
        return f"{self. nombre}"





class Insumo(models.Model):

    descripcion= models.TextField(max_length=100,null=True)
    cantidad= models.FloatField()
    estado=models.BooleanField(default=False)

    def __str__(self):
        return f"{self.descripcion}"





class Pedido(models.Model):

    fecha_pedido= models.DateField()
    observaciones= models.TextField(max_length=100 ,blank=True, null=True)
    proveedor= models.ForeignKey(Proveedor,on_delete=models.CASCADE)
    estado=models.BooleanField(default=True)

    def __str__(self):
        return f"Fecha de pedido: {self.fecha_pedido} Observaciones: {self.observaciones} proveedor: {self.proveedor.nombre}"



class ItemInsumo(models.Model):
    pedido= models.ForeignKey(Pedido, on_delete=models.CASCADE,related_name="insumos")
    insumo= models.ForeignKey(Insumo, on_delete=models.CASCADE)
    cantidad= models.IntegerField()



class recepcionPedidos(models.Model):
    fecha_llegada=models.DateField(auto_now=True)
    observacion= models.TextField(max_length=100 ,blank=True, null=True)
    conformidad= models.BooleanField()
    pedido= models.ForeignKey(Pedido,on_delete=models.CASCADE)
    