from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from .models import Insumo,Pedido,ItemInsumo
from .forms import PedidoForm, ItemInsumoFormSet

# Create your views here.


def pedidos(request):
    pedidos=Pedido.objects.all()
    return render (request, 'pedidos/Lista-pedidos.html',{
        'pedidos':pedidos
    })


def registroPedidos(request):
    insumos= Insumo.objects.filter(estado=True)
    if request.method == 'POST':
        form = PedidoForm(request.POST,request.FILES)
        print('Datos recibidos:', request.POST)
      
        
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


def eliminarPedido(request,pk):
    pedido = get_object_or_404(Pedido, pk=pk)