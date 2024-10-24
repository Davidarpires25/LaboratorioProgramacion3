from django.contrib import messages
from django.shortcuts import redirect, render

from .forms import PedidoForm, ItemInsumoFormSet

# Create your views here.



def registroPedidos(request):
    
    if request.method == 'POST':
        form = PedidoForm(request.POST,request.FILES)
        print('Datos recibidos:', request.POST)
        print(form)
        if form.is_valid():
            print('valido')
            pedido = form.save()
            formset = ItemInsumoFormSet(request.POST, instance=pedido)
            print('guardo pedido')
            if formset.is_valid():
                print('valido formest')
                formset.save()
                messages.success(request, 'pedido creado exitosamente.')
                return redirect('home')
    else:
        form = PedidoForm()
        formset = ItemInsumoFormSet()

    return render(request, 'pedidos/Registro-gestion-pedidos.html', {
        'formPedido': form,
        'formset': formset
    })




