from django.shortcuts import render

# Create your views here.
def registroVentas(request):
    return render(request, 'ventas/Registro_gestion_ventas.html', {'host':request.get_host()})

def registroMayoristas(request):
    return render(request, 'ventas/Registro_mayoristas.html')