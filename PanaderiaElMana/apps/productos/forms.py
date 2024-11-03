from django import forms
from .models import Producto

class ProductoForm(forms.ModelForm):
    
    categorias = [("", "Seleccione"), ("PAN", "Panificación"), ("PAS", "Pastelería")]
    categoria = forms.ChoiceField(choices=categorias,
                widget=forms.Select(attrs={'class': 'formulario__input','id':'categoria_producto',}))

    class Meta:

        model = Producto
        fields = ['descripcion', 'precio', 'cantidad', 'categoria']

        widgets = {

            'descripcion': forms.TextInput(attrs={
                'class': 'formulario__input', 
                'id': 'descripcion_producto',
               
            }),
            'precio': forms.NumberInput(attrs={
                'class': 'formulario__input', 
                'id': 'precio_producto',
            }),
            'cantidad': forms.NumberInput(attrs={
                'class': 'formulario__input', 
                'id': 'cantidad_producto',
            })
        }

 