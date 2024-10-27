from django.db import models
from django.core.validators import MinValueValidator
from apps.productos.models import Producto

# Create your models here.

class Mayorista(models.Model):
    cuit= models.CharField(max_length=11,primary_key=True)
    razon_social=models.CharField(max_length=20)
    direccion= models.TextField(max_length=50)
    telefono= models.CharField(max_length=20)
    email= models.CharField(max_length=50)
    estado=models.BooleanField(default=False)
    CONDICION_VENTA_CHOICES = [
        ('CONTADO', 'Contado'),  # Primer valor es el que se guarda en la BD, el segundo es el que se muestra
        ('CREDITO', 'Credito'),  
    ]
    condicion_venta= models.CharField(max_length=15, choices=CONDICION_VENTA_CHOICES)
    
    def __str__(self):
        return self.razon_social

class Venta(models.Model):
    numeroComprobante= models.CharField(max_length=15)
    FechaVenta= models.DateField()
    precioTotal= models.FloatField(validators=[MinValueValidator(0.0)])
    observaciones= models.TextField(max_length=200)                        

    TIPO_VENTA_CHOICES = [
        ('MINORISTA', 'Minorista'),  # Primer valor es el que se guarda en la BD, el segundo es el que se muestra
        ('MAYORISTA', 'Mayorista')
        
    ]
    TIPO_COMPROBANTE_CHOICES = [
        ('RECIBO', 'Recibo'),  # Primer valor es el que se guarda en la BD, el segundo es el que se muestra
        ('FACTURA', 'Factura'),
        ('OTRO', 'Otro')
        
    ]
    FORMA_PAGO_CHOICES = [
        ('CONTADO', 'Contado'),  # Primer valor es el que se guarda en la BD, el segundo es el que se muestra
        ('TRANSFERENCIA', 'Transferencia'),
        ('CREDITO', 'Credito'),
        ('OTRO', 'Otro')
        
    ]
    tipo_venta = models.CharField(max_length=15, choices=TIPO_VENTA_CHOICES)
    tipo_comprobante = models.CharField(max_length=15, choices=TIPO_COMPROBANTE_CHOICES)
    forma_pago = models.CharField(max_length=15, choices=FORMA_PAGO_CHOICES)
    

    

class ItemProducto(models.Model):
    venta= models.ForeignKey(Venta,on_delete=models.CASCADE)
    producto= models.ForeignKey(Producto,on_delete=models.CASCADE)
    cantidad= models.PositiveIntegerField()
    precioActual= models.FloatField(validators=[MinValueValidator(0.0)])




class itemMayorista(models.Model):
    venta=models.ForeignKey(Venta, on_delete=models.CASCADE)
    mayorista_cuit=models.ForeignKey(Mayorista, on_delete=models.CASCADE)
  
