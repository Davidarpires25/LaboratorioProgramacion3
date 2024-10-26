from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from .models import Insumo,Pedido
from .forms import PedidoForm, ItemInsumoFormSet

# Create your views here.



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
                
    else:
        form = PedidoForm()
        formset = ItemInsumoFormSet()

    return render(request, 'pedidos/Registro-gestion-pedidos.html', {
        'formPedido': form,
        'formset': formset,
        'insumos':insumos
    })


def editarPedidos(request, pk):
    pedido = get_object_or_404(Pedido, pk=pk)
    if request.method == 'POST':
        form = PedidoForm(request.POST, request.FILES, instance=Pedido)
        if form.is_valid():
            pedido = form.save()
            formset = ItemInsumoFormSet(request.POST, instance=pedido)
            if formset.is_valid():
                formset.save()
                messages.success(request, 'Pedido actualizado exitosamente.')
                return redirect('home')
    else:
        form = PedidoForm(instance=pedido)
        formset = ItemInsumoFormSet(instance=pedido)

    return render(request, 'pedidos/Detalle-pedido.html', {
        'form': form,
        'formset': formset,
        'pedido': pedido
    })


