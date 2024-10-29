from django.urls import path
from apps.pedidos import views 

app_name = 'pedidos'
urlpatterns = [
    path('', views.registroPedidos, name='registro_pedidos'),
    path('lista/',views.pedidos,name='lista_pedidos'),
    path('detalle/<int:pk>', views.editarPedidos, name='editarPedidos'),
    path('cancelar/<int:pk>', views.cancelarPedido, name='cancelarPedido'),
     path('lista_recepcion/',views.listaRecepcion,name='listaRecepcion'),
    path('recepcionar/<int:pk>', views.recepcionarPedidos, name='recepcionarPedidos'),
]