from django import forms
from .models import Pedido,ItemInsumo,Insumo,Proveedor
from django.forms import inlineformset_factory




class PedidoForm(forms.ModelForm):
    fecha_pedido = forms.DateField(
        widget=forms.DateInput(attrs={
            'class': 'formulario__input', 
            'id': 'fechaPedido', 
            'type': 'date'  # Asegúrate de establecer el tipo como 'date'
        })
    )
    proveedor = forms.ModelChoiceField(
        queryset=Proveedor.objects.filter(estado=True),
        empty_label="Seleccione",  # Filtra solo los insumos activos
        widget=forms.Select(attrs={
            'class': 'formulario__input',
            'id':'proveedor',
        }),
   
    )
    
    class Meta:
        model = Pedido
        fields = ['fecha_pedido', 'proveedor', 'observaciones']
        
        widgets = {
         
            'proveedor': forms.Select(attrs={
                'class': 'formulario__input', 
                'id': 'proveedor'
            }),
            'observaciones': forms.TextInput(attrs={
                'class': 'formulario__input', 
                'placeholder': 'ta bueno', 
                'id': 'observaciones'
            }),
        }


class ItemInsumoForm(forms.ModelForm):
    insumo = forms.ModelChoiceField(
        queryset=Insumo.objects.filter(estado=True),
        empty_label="Seleccione",  # Filtra solo los insumos activos
        widget=forms.Select(attrs={
            'class': 'formulario__input',
            'id':'insumo',
        }),
 
    )
    class Meta:
        model = ItemInsumo
        fields = ['insumo', 'cantidad']
        widgets = {
            'cantidad': forms.NumberInput(attrs={
                'class': 'formulario__input', 
                'id': 'cantidad'
            }),
           
        }
        

ItemInsumoFormSet = inlineformset_factory(
    Pedido,  # El modelo padre
    ItemInsumo,  # El modelo hijo que está relacionado con el padre
    form=ItemInsumoForm,  # El formulario que creamos antes
    extra=1,  # Cuántos formularios extra queremos mostrar
    can_delete=True  # Permitir eliminar objetos existentes
)