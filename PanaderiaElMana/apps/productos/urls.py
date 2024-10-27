from django.urls import path
from apps.productos import views 

app_name = 'productos'
urlpatterns = [
    path('', views.gestionarProductos, name='gestionarProductos'),
    path('baja_cantidad', views.productosCantidadBaja, name='baja_cantidad')
]