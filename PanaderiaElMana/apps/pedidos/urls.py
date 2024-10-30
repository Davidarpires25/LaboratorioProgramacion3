from django.urls import path
from apps.pedidos import views 

app_name = 'pedidos'
urlpatterns = [
    path('', views.registroPedidos, name='registro_pedidos'),
    path('insumos', views.gestionarInsumos, name='gestionarInsumos'),
    path('insumos/editar/<int:pk>', views.editarInsumos, name='editar_insumos'),
    path('insumos/eliminar/<int:pk>', views.eliminarInsumos, name='eliminar_insumos'),
]