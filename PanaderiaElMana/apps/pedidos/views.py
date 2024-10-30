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
        pedido.estado = False
        pedido.save()
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
   

    if request.method == 'POST':
        form = RecepcionForm(request.POST,request.FILES)
        formset = ItemInsumoFormSet(request.POST,instance=pedido)
        print(form)
        if form.is_valid():
            recepcion = form.save(commit=False)  
            recepcion.pedido = pedido  
            recepcion.save()  

            for form in formset[:-1]:
                item_insumo = form.save(commit=False)
                insumo = item_insumo.insumo
                insumo.cantidad += item_insumo.cantidad
                insumo.save()      

            pedido.estado = False
            pedido.save()
            messages.success(request, 'Pedido reservado exitosamente.')
            return redirect('pedidos:listaRecepcion')
    else:
        form = RecepcionForm()
        formset = ItemInsumoFormSet(instance=pedido)

        
    return render(request, 'pedidos/Recepcion-pedido.html', {
        'form': form,
        'formPedido': formpedido,
        'formset': formset,
        'pedido':pedido
    })