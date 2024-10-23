from django.shortcuts import render

# Create your views here.
def gestionarProductos(request):
    return render(request, 'productos/Gestion-productos.html')
