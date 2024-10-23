from django import forms
from .models import Pedido,ItemInsumo,Insumo





class PedidoForm(forms.ModelForm):
    
    class Meta:
        model = Pedido
        fields = ['cantidad', 'proveedor', 'observaciones']
        
        widgets = {

            'cantidad': forms.NumberInput(attrs={
                'class': 'formulario__input', 
                'placeholder': '#1,2,3...', 
                'id': 'cantidad'
            }),
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
        queryset=Insumo.objects.filter(estado=True),  # Filtra solo los insumos activos
        widget=forms.Select(attrs={
            'class': 'formulario__input',  
        }),
        label="Seleccionar Insumo"
    )
    class Meta:
        model = ItemInsumo
        fields = ['pedido','insumo', 'cantidad', 'precio']
        widgets = {
            'cantidad': forms.Select(attrs={
                'class': 'formulario__input', 
                'id': 'cantidad'
            }),
            'precio': forms.TextInput(attrs={
                'class': 'formulario__input', 
                'placeholder': '$1200', 
                'id': 'precio'
            }),
        }
        
