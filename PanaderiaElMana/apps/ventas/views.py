from django.shortcuts import render
from .forms import ventasForm

# Create your views here.
def registroVentas(request):
    if request.method == "POST":
        form = ventasForm(request.POST, request.FILES)
        if form.is_valid():
            print("validoooooooo")
    else:
        form = ventasForm()
    return render(request, 'ventas/Registro_gestion_ventas.html', {'formVenta':form})