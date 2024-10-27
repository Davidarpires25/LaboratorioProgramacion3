from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import render
from .models import Producto

# Create your views here.
def gestionarProductos(request):
    return render(request, 'productos/Gestion-productos.html')


def productosCantidadBaja(request):
    productos = Producto.objects.filter(cantidad__lt=10).values('id', 'descripcion', 'cantidad')
    # jsonProductos = serializers.serialize('json', productos)
    print(productos)
    return JsonResponse(list(productos), safe=False)
