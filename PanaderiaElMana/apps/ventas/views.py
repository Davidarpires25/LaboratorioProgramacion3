from django.shortcuts import render, redirect
from .forms import ventasForm, ItemProductoFormSet

# Create your views here.
def registroVentas(request):
    if request.method == "POST":
        form = ventasForm(request.POST, request.FILES)
        if form.is_valid():
            ventaNueva = form.save()
            formset = ItemProductoFormSet(request.POST, instance=ventaNueva)
            print(request.POST)  # Ver los datos que se están enviando
            print(formset.errors) 
            print(f'Número de formularios: {len(formset.save())}')  # Para ver cuántos formularios están en el formset

            if formset.is_valid():
                formset.save()
                return redirect('home')
    else:
        form = ventasForm()
        formset = ItemProductoFormSet()
    return render(request, 'ventas/Registro_gestion_ventas.html', {'formVenta':form, 'formset':formset})