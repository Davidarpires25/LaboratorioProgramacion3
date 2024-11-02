from django.contrib import messages
from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Prefetch
from django.urls import reverse
from .forms import ventasForm, ItemProductoFormSet
from .models import itemMayorista, Venta, ItemProducto, Mayorista
from apps.productos.models import Producto
from django.db import transaction

# Create your views here.
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
                        messages.success(request, "La venta se ha realizado exitosamente.")
                    else:
                        raise ValueError("Error en formset")
                    return redirect(f'http://{request.get_host()}/ventas/')
            except Exception as e:
                if "id_producto" in str(e):
                    mensaje_error = "CANTIDAD INVALIDA! LA VENTA NO SE PUDO REALIZAR"
                else:
                    mensaje_error = "Ocurrió un error al guardar los datos."
                messages.error(request, mensaje_error)
                return redirect(reverse('ventas:registro_ventas'))
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

def devolverCantidadStock(lst_venta_productos):
    for producto_venta in lst_venta_productos:
        idProducto = producto_venta['producto_id']
        cantidadVendida = producto_venta['cantidad']
        producto = get_object_or_404(Producto, id = idProducto)
        producto.cantidad += cantidadVendida
        producto.save()

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


def registroMayoristas(request):
    if request.method == 'POST':
        razonSocial = request.POST.get("razonSocial")
        cuit = request.POST.get("cuit")
        direccion = request.POST.get("direccion")
        telefono = request.POST.get("telefono")
        correo = request.POST.get("correo")
        condicionVenta = request.POST.get("condicionVenta")
        nuevoMayorista = Mayorista(
            cuit = cuit,
            razon_social = razonSocial,
            direccion = direccion,
            telefono = telefono,
            email = correo,
            condicion_venta = condicionVenta
        )
        nuevoMayorista.save()
    return render(request, 'ventas/Registro_mayoristas.html')


def informeMayoristas(request):
    mayoristas = Mayorista.objects.all()
    print(mayoristas)
    return render(request, "ventas/Lista_mayoristas.html", {'mayoristas':mayoristas})