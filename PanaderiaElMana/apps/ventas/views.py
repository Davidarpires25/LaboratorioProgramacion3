from pyexpat.errors import messages
from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Prefetch
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
    venta_productos = (
        Venta.objects
        .filter(id=id)  # Filtra solo la venta específica
        .select_related("itemmayorista__mayorista_cuit")  # Para acceder a los datos del mayorista
        .prefetch_related(
            Prefetch("itemproducto_set", queryset=ItemProducto.objects.select_related("producto"))
        )
        .values(
            "id", 
            "numeroComprobante", 
            "FechaVenta", 
            "precioTotal", 
            "observaciones", 
            "tipo_venta", 
            "tipo_comprobante", 
            "forma_pago", 
            # Campos de ItemProducto
            "itemproducto__producto_id", 
            "itemproducto__producto__descripcion", 
            "itemproducto__precioActual", 
            "itemproducto__cantidad", 
            "itemproducto__subtotal",
            "itemproducto__producto__categoria", 
            # Campos de Mayorista
            "itemmayorista__mayorista_cuit__cuit", 
            "itemmayorista__mayorista_cuit__razon_social"
        )
    )
    return render(request, 'ventas/Detalles_venta.html', {'venta_productos':venta_productos})


def anularVenta(request, id):
    if request.method == 'POST':
        venta = get_object_or_404(Venta, id=id)
        productosAsociados = ItemProducto.objects.filter(venta_id=3).select_related('producto').values('producto__id', 'producto__cantidad')
        print(productosAsociados)
        venta.estado = False
        venta.save()
        # messages.success(request, "La venta ha sido anulada exitosamente.")
        return redirect('ventas:informe_ventas')
    
    else:
        # messages.error(request, "La cancelación no se pudo completar.")
        return redirect('ventas:informe_ventas')


def registroMayoristas(request):
    return render(request, 'ventas/Registro_mayoristas.html')

