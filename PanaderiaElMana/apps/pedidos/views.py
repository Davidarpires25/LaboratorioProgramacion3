from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.urls import reverse
from django.db.models import Q
from .models import Insumo
from .forms import InsumoForm

# Create your views here.

def registroPedidos(request):
    return render(request,'pedidos/Registro-gestion-pedidos.html')

def gestionarInsumos(request):
    nuevo_insumo = None
    insumos = Insumo.objects.filter(estado=True)

    if request.method == 'POST':
        insumo_form = InsumoForm(request.POST, request.FILES)
        if insumo_form.is_valid():

            descripcion = insumo_form.cleaned_data['descripcion'].lower()

            if Insumo.objects.filter(Q(descripcion__iexact=descripcion), estado=True).exists():
                messages.error(request, 'El Insumo ya existe')
                return render(request, 'pedidos/Gestion-insumos.html', {'insumo_form': insumo_form,'insumos':insumos})
            else:
                nuevo_insumo = insumo_form.save(commit=False)
                nuevo_insumo.save()
                messages.success(
                request,
                "Insumo agregado exitosamente")
                return redirect(reverse('pedidos:gestionarInsumos'))
                
    else:
        insumo_form = InsumoForm()
    return render(request, 'pedidos/Gestion-insumos.html', {'insumo_form': insumo_form,'insumos':insumos})

def editarInsumos(request, pk):
    insumos= Insumo.objects.filter(estado=True)
    insumo = get_object_or_404(Insumo, pk=pk)
    if request.method == 'POST':
        form = InsumoForm(request.POST, request.FILES, instance=insumo)
        if form.is_valid():

            descripcion = form.cleaned_data['descripcion'].lower()

            existe_insumo = Insumo.objects.filter(
                Q(descripcion__iexact=descripcion)
            , estado=True).exclude(id=insumo.id).exists()

            if existe_insumo:
                messages.error(request, 'El insumo ya existe')
                return render(request, 'pedidos/editar-insumos.html', {'form': form, 'insumo': insumo, 'insumos':insumos})
            insumo = form.save()
            messages.success(request, "El producto ha sido modificado exitosamente.")
            print('Datos recibidos:', request.POST)
            return redirect('pedidos:gestionarInsumos')
        
        return render(request, 'pedidos/editar-insumos.html', {
                'form': form,
                'insumo': insumo,
                'insumos': insumos,
            })
    else:
        form = InsumoForm(instance=insumo)

    return render(request, 'pedidos/editar-insumos.html', {
        'form': form,
        'insumo': insumo,
        'insumos': insumos
    })

def eliminarInsumos(request, pk):
    insumo = get_object_or_404(Insumo, pk=pk)
    
    if request.method == 'POST':
        print("Estado anterior:", insumo.estado)
        insumo.estado = False
        insumo.save()
        messages.success(request, "El insumo ha sido eliminado exitosamente.")
        return redirect('pedidos:gestionarInsumos')
    
    else:
        messages.error(request, "La eliminación no se pudo completar.")
        return redirect('pedidos:gestionarInsumos') 