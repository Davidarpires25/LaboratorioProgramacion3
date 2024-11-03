from pyexpat.errors import messages
from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Prefetch
from .forms import ventasForm, ItemProductoFormSet
from .models import itemMayorista, Venta, ItemProducto
from apps.productos.models import Producto
from django.db import transaction
from django.contrib.auth.decorators import login_required,permission_required
# Create your views here.


@login_required
@permission_required('ventas.add_venta', raise_exception=True)
def registroVentas(request):
    if request.method == "POST":
        form = ventasForm(request.POST, request.FILES) 
        if form.is_valid():
            tipoVenta = form.cleaned_data.get('tipo_venta')
            try:
                with transaction.atomic():
                    ventaNueva = form.save()
                    if tipoVenta == 'MAYORISTA':
                        idMayorista = request.POST.get("cuitMayorista")
                        nuevaVentaMayorista = itemMayorista(
                            venta=ventaNueva,
                            mayorista_cuit_id=idMayorista
                        )
                        nuevaVentaMayorista.save()

                    formset = ItemProductoFormSet(request.POST, instance=ventaNueva)
                    if formset.is_valid():
                        formset.save()
                    else:
                        raise ValueError("Error en formset")
                    return redirect(f'http://{request.get_host()}/ventas/')
            except Exception as e:
                print("Error al guardar la transacción:", e)
    form = ventasForm()
    formset = ItemProductoFormSet()
    return render(request, 'ventas/Registro_gestion_ventas.html', {'formVenta':form, 'formset':formset})    



@login_required
@permission_required('ventas.view_venta', raise_exception=True)
def informeVentas(request):
    ventas = Venta.objects.all().order_by('-id')
    return render (request, 'ventas/Lista_ventas.html',{
        'ventas': ventas
    })   

            # print(request.POST)  # Ver los datos que se están enviando
            # print(formset.errors) 
            # print(f'Número de formularios: {len(formset.save())}')  # Para ver cuántos formularios están en el formset


@login_required
@permission_required('ventas.view_venta', raise_exception=True)
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
            "estado",
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


@login_required
def devolverCantidadStock(lst_venta_productos):
    for producto_venta in lst_venta_productos:
        idProducto = producto_venta['producto_id']
        cantidadVendida = producto_venta['cantidad']
        producto = get_object_or_404(Producto, id = idProducto)
        producto.cantidad += cantidadVendida
        producto.save()


@login_required
@permission_required('ventas.delete_venta', raise_exception=True)
def anularVenta(request, id):
    if request.method == 'POST':
        venta = get_object_or_404(Venta, id=id)
        productosAsociados = ItemProducto.objects.filter(venta_id=id).values('producto_id', 'cantidad')
        devolverCantidadStock(productosAsociados)
        venta.estado = False
        venta.save()
        # messages.success(request, "La venta ha sido anulada exitosamente.")
        return redirect('ventas:informe_ventas')
    
    else:
        # messages.error(request, "La cancelación no se pudo completar.")
        return redirect('ventas:informe_ventas')


@login_required
@permission_required('ventas.add_mayorista', raise_exception=True)
def registroMayoristas(request):
    return render(request, 'ventas/Registro_mayoristas.html')

