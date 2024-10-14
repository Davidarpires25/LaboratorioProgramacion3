from django.shortcuts import render

# Create your views here.

def registroPedidos(request):
    return render(request,'pedidos/Registro-gestion-pedidos.html')