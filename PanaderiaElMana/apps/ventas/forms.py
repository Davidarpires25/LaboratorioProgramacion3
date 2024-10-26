from django import forms
from .models import Venta, Producto, ItemProducto
from django.forms import inlineformset_factory, DateInput
import datetime


class ventasForm(forms.ModelForm):
    class Meta:
        model = Venta
        fields = ['tipo_venta', 'FechaVenta', 'tipo_comprobante', 'numeroComprobante', 'forma_pago', 'observaciones', 'precioTotal']   

        widgets = {
            'tipo_venta': forms.Select(attrs={
                'class': 'formulario__input',
                'id': 'CategoriaVenta',
                'name': 'catgVenta'
            }),
            'FechaVenta': DateInput(attrs={
                'type': 'date',
                'class': 'formulario__input',
                'name': 'fechaSolicitud',
                'id': 'fechaVenta'
            }),
            'tipo_comprobante': forms.Select(attrs={
                'class': 'formulario__input',
                'id': 'tipoComprobante',
                'name': 'tipoComprobante'
            }),
            'numeroComprobante': forms.NumberInput(attrs={
                'class': 'formulario__input',
                'id': 'nroComprobante',
                'name': 'nroComprobante'
            }),
            'forma_pago': forms.Select(attrs={
                'class': 'formulario__input',
                'id': 'formaPago',
                'name': 'formaPago'                 
            }),
            'observaciones': forms.TextInput(attrs={
                'class': 'formulario__input',
                'id': 'observaciones',
                'name': 'observaciones'                 
            }),
            'precioTotal': forms.TextInput(attrs={
                'class': 'formulario__input',
                'id': 'precioTotal',
                'name': 'precioTotal'                 
            })
        }

                # 'class': '',
                # 'id': '',
                # 'name': ''


class ProductoForm(forms.ModelForm):
    producto = forms.ModelChoiceField(
        queryset=Producto.objects.filter(estado=True),
        empty_label="Seleccione",  # Filtra solo los insumos activos
        widget=forms.Select(attrs={
            'class': 'formulario__input',
            'id':'producto'
        })
    )
    class Meta:
        model = ItemProducto
        fields = ['producto', 'cantidad', 'precioActual']
        widget = {
            'precioActual': forms.NumberInput(attrs={
                'class': 'formulario__input',
                'id': 'precioActual',
                'name': 'precioActual'
            }),
            'cantidad': forms.NumberInput(attrs={
                'class': 'formulario__input',
                'id': 'cantidad',
                'name': 'cantidad'                
            })
        }

ItemProductoFormSet = inlineformset_factory(
    Venta,  # El modelo padre
    ItemProducto,  # El modelo hijo que está relacionado con el padre
    form=ProductoForm,  # El formulario que creamos antes
    extra=1,  # Cuántos formularios extra queremos mostrar
    can_delete=True  # Permitir eliminar objetos existentes
)    
#     class Meta:
#         model = Pedido
#         fields = ['fecha_pedido', 'proveedor', 'observaciones']
        
#         today = datetime.date.today()
#         max_date = today + datetime.timedelta(days=10)
#         widgets = {
#              'fecha_pedido': DateInput(format='%Y-%m-%d', attrs={
#                 'type': 'date',
#                 'class': 'formulario__input',
#                 'min': today.strftime('%Y-%m-%d'),  # Asigna el 'min' como la fecha de hoy
#                 'max': max_date.strftime('%Y-%m-%d'),
           
#             }),

#             'proveedor': forms.Select(attrs={
#                 'class': 'formulario__input', 
#                 'id': 'proveedor',
               
#             }),
#             'observaciones': forms.TextInput(attrs={
#                 'class': 'formulario__input', 
#                 'placeholder': 'ta bueno', 
#                 'id': 'observaciones',
#             }),
#         }


# class ItemInsumoForm(forms.ModelForm):
#     insumo = forms.ModelChoiceField(
#         queryset=Insumo.objects.filter(estado=True),
#         empty_label="Seleccione",  # Filtra solo los insumos activos
#         widget=forms.Select(attrs={
#             'class': 'formulario__input',
#             'id':'insumo',
#         }),
 
#     )
#     class Meta:
#         model = ItemInsumo
#         fields = ['insumo', 'cantidad']
#         widgets = {
#             'cantidad': forms.NumberInput(attrs={
#                 'class': 'formulario__input', 
#                 'id': 'cantidad'
#             }),
           
#         }
        

# ItemInsumoFormSet = inlineformset_factory(
#     Pedido,  # El modelo padre
#     ItemInsumo,  # El modelo hijo que está relacionado con el padre
#     form=ItemInsumoForm,  # El formulario que creamos antes
#     extra=1,  # Cuántos formularios extra queremos mostrar
#     can_delete=True  # Permitir eliminar objetos existentes
# )