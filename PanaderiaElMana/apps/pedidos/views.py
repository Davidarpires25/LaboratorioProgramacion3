from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from .models import Insumo,Pedido,ItemInsumo,RecepcionPedidos
from .forms import PedidoForm, ItemInsumoFormSet,RecepcionForm

# Create your views here.


def pedidos(request):
    pedidos=Pedido.objects.all().order_by('-id')
    return render (request, 'pedidos/Lista-pedidos.html',{
        'pedidos':pedidos
    })


def registroPedidos(request):
    insumos= Insumo.objects.filter(estado=True)
    if request.method == 'POST':
        form = PedidoForm(request.POST,request.FILES)      
        
        if form.is_valid():
            pedido = form.save()
            formset = ItemInsumoFormSet(request.POST, instance=pedido)
            print('formset',formset)
            
            if formset.is_valid():
                print('valido formest')
                formset.save()
                messages.success(request, 'pedido creado exitosamente.')
                return redirect('pedidos:lista_pedidos')
                
    else:
        form = PedidoForm()
        formset = ItemInsumoFormSet()

    return render(request, 'pedidos/Registro-gestion-pedidos.html', {
        'formPedido': form,
        'formset': formset,
        'insumos':insumos
    })


def editarPedidos(request, pk):
    insumos= Insumo.objects.filter(estado=True)
    pedido = get_object_or_404(Pedido, pk=pk)
    if request.method == 'POST':
        form = PedidoForm(request.POST, request.FILES, instance=pedido)
        if form.is_valid():
            pedido = form.save()
            formset = ItemInsumoFormSet(request.POST, instance=pedido)
            print('Datos recibidos:', request.POST)
            print('formset',formset)
            if formset.is_valid():
                formset.save()
                messages.success(request, 'Pedido actualizado exitosamente.')
                return redirect('pedidos:lista_pedidos')
    else:
        form = PedidoForm(instance=pedido)
        formset = ItemInsumoFormSet(instance=pedido)

    return render(request, 'pedidos/Detalle-pedido.html', {
        'form': form,
        'formset': formset,
        'pedido': pedido,
        'insumos':insumos
    })


def cancelarPedido(request, pk):
    print("Cancelando pedido con ID:", pk)  # Agrega esta línea
    pedido = get_object_or_404(Pedido, pk=pk)
    
    if request.method == 'POST':
        print("Estado anterior:", pedido.estado)  # Agrega esta línea
        pedido.estado = False
        pedido.save()
        print("Nuevo estado:", pedido.estado)  # Agrega esta línea
        messages.success(request, "El pedido ha sido cancelado exitosamente.")
        return redirect('pedidos:lista_pedidos')
    
    else:
        messages.error(request, "La cancelación no se pudo completar.")
        return redirect('pedidos:lista_pedidos')
    

def listaRecepcion(request):
    pedidos=Pedido.objects.all().order_by('-id')
    return render (request, 'pedidos/Lista-recepcion.html',{
        'pedidos':pedidos
    })



def recepcionarPedidos(request, pk):
    pedido = get_object_or_404(Pedido, pk=pk)
    formpedido = PedidoForm(request.POST, request.FILES, instance=pedido)
    formset = ItemInsumoFormSet(instance=pedido)
    print('esta en view')

    if request.method == 'POST':
        print(request.POST)
        form = RecepcionForm(request.POST,request.FILES)
        print(form.is_valid)
        print(form.errors)
        if form.is_valid():
            recepcion = form.save(commit=False)  # Evita que se guarde en la base de datos inmediatamente
            recepcion.pedido = pedido  # Asigna el pedido antes de guardar
            recepcion.save()  # Ahora guarda el objeto con el pedido ya asignado
            pedido.estado = False
            pedido.save()
            messages.success(request, 'Pedido reservado exitosamente.')
            return redirect('pedidos:listaRecepcion')
    else:
        form = RecepcionForm()

    return render(request, 'pedidos/Recepcion-pedido.html', {
        'form': form,
        'formPedido': formpedido,
        'formset': formset,
        'pedido':pedido
    })