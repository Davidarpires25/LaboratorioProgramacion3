from django import forms
from .models import Insumo

class InsumoForm(forms.ModelForm):

    class Meta:

        model = Insumo
        fields = ['descripcion', 'cantidad']

        widgets = {

            'descripcion': forms.TextInput(attrs={
                'class': 'formulario__input', 
                'id': 'descripcion_insumo',
               
            }),
            'cantidad': forms.NumberInput(attrs={
                'class': 'formulario__input', 
                'id': 'cantidad_insumo',
            })
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            if not isinstance(field.widget, forms.CheckboxInput):
                field.widget.attrs['class'] = 'form-control'
            else:
                field.widget.attrs['class'] = 'form-check-input'