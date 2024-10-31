from django import forms
from .models import Pedido,ItemInsumo,Insumo,Proveedor,RecepcionPedidos
from django.forms import inlineformset_factory, DateInput
import datetime




class PedidoForm(forms.ModelForm):
  
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
        
        today = datetime.date.today()
        max_date = today + datetime.timedelta(days=10)
        widgets = {
             'fecha_pedido': DateInput(format='%Y-%m-%d', attrs={
                'type': 'date',
                'class': 'formulario__input',
                'min': today.strftime('%Y-%m-%d'),  # Asigna el 'min' como la fecha de hoy
                'max': max_date.strftime('%Y-%m-%d'),
           
            }),

            'proveedor': forms.Select(attrs={
                'class': 'formulario__input', 
                'id': 'proveedor',
               
            }),
            'observaciones': forms.TextInput(attrs={
                'class': 'formulario__input', 
                'placeholder': 'ta bueno', 
                'id': 'observaciones',
            }),
        }


class ItemInsumoForm(forms.ModelForm):
    insumo = forms.ModelChoiceField(
        queryset=Insumo.objects.filter(estado=True),
        empty_label="Seleccione",  # Filtra solo los insumos activos
        widget=forms.Select(attrs={
            'class': 'formulario__input',
          
        }),
 
    )
    UNIDAD_CHOICE = [("", "Seleccione"),
                     ("Kilogramos","Kg"),
                     ("Gramos","g"),
                     ("Litros","L"),
                     ("Mililitros","ml"),
                     ("Unidades","u")
                    ]
    
    unidad_medida=forms.ChoiceField(
                choices=UNIDAD_CHOICE,
                widget=forms.Select(attrs={
                    'class': 'formulario__input'
                }))
    
    class Meta:
        model = ItemInsumo
        fields = ['insumo', 'cantidad','unidad_medida']
        widgets = {
            'cantidad': forms.NumberInput(attrs={
                'class': 'formulario__input', 
                
            }),
            
           
        }
        

    

class RecepcionForm(forms.ModelForm):
  
    class Meta:
        model = RecepcionPedidos
        fields = ['observacion', 'conformidad','precio_total']
        
        today = datetime.date.today()
        max_date = today + datetime.timedelta(days=10)
        widgets = {
            'observacion': forms.TextInput(attrs={
                'class': 'formulario__input', 
                'placeholder': 'ta bueno', 
                
            }),
              'conformidad': forms.CheckboxInput(attrs={
                'class': 'check__input', 
               
            }),
              'precio_total': forms.NumberInput(attrs={
                'class': 'formulario__input', 
                'id':'precioTotal'

            }),
        }

ItemInsumoFormSet = inlineformset_factory(
    Pedido,  # El modelo padre
    ItemInsumo,  # El modelo hijo que está relacionado con el padre
    form=ItemInsumoForm,  # El formulario que creamos antes
    extra=1,  # Cuántos formularios extra queremos mostrar
    can_delete=True  # Permitir eliminar objetos existentes
)