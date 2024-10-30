from django.shortcuts import render, redirect
from .forms import ventasForm, ItemProductoFormSet
from .models import itemMayorista, Venta, ItemProducto
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
                return redirect(f'http://{request.get_host()}/ventas/')
    else:
        form = ventasForm()
        formset = ItemProductoFormSet()
    return render(request, 'ventas/Registro_gestion_ventas.html', {'formVenta':form, 'formset':formset})

def informeVentas(request):
    ventas = Venta.objects.all().order_by('-id')
    return render (request, 'ventas/Lista_ventas.html',{
        'ventas': ventas
    })   

            # print(request.POST)  # Ver los datos que se están enviando
            # print(formset.errors) 
            # print(f'Número de formularios: {len(formset.save())}')  # Para ver cuántos formularios están en el formset

def detalleVenta(request, id):
    venta_productos = ItemProducto.objects.select_related('venta', 'producto').filter(venta_id=id)
    print(venta_productos)
    return render(request, 'ventas/Detalles_venta.html', {'venta_productos':venta_productos})

def registroMayoristas(request):
    return render(request, 'ventas/Registro_mayoristas.html')

