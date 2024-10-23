from django.shortcuts import render

from .forms import PedidoForm, ItemInsumoForm

# Create your views here.

def registroPedidos(request):
    form_pedido= PedidoForm()
    form_item_insumo=ItemInsumoForm()
    if request.POST=='POST':

        return render(request,'pedidos/Registro-gestion-pedidos.html',{'form':form_pedido,'form_insumo_pedido':form_item_insumo})
    else:    
        return render(request,'pedidos/Registro-gestion-pedidos.html',{'form':form_pedido,'form_insumo_pedido':form_item_insumo})