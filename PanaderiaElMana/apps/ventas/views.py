from django.shortcuts import render, redirect
from .forms import ventasForm, ItemProductoFormSet
from .models import itemMayorista
# Create your views here.
def registroVentas(request):
    if request.method == "POST":
        form = ventasForm(request.POST, request.FILES)
        if form.is_valid():
            tipoVenta = form.cleaned_data.get('tipo_venta')
            ventaNueva = form.save()
            if tipoVenta == 'MAYORISTA':
                idMayorista = request.POST.get("cuitMayorista")
                nuevaVentaMayorista = itemMayorista(
                    venta = ventaNueva, 
                    mayorista_cuit_id = idMayorista
                    )
                nuevaVentaMayorista.save()
            formset = ItemProductoFormSet(request.POST, instance=ventaNueva)
            if formset.is_valid():
                formset.save()
                return redirect('home')
    else:
        form = ventasForm()
        formset = ItemProductoFormSet()
    return render(request, 'ventas/Registro_gestion_ventas.html', {'formVenta':form, 'formset':formset})



            # print(request.POST)  # Ver los datos que se están enviando
            # print(formset.errors) 
            # print(f'Número de formularios: {len(formset.save())}')  # Para ver cuántos formularios están en el formset