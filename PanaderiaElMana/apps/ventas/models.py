from django.db import models

from apps.productos.models import Producto

# Create your models here.


class Venta(models.Model):
    numeroComprobante= models.IntegerField()
    FechaVenta= models.DateField()
    precio= models.FloatField()
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
    producto= models.ManyToManyField(Producto)

    

    
