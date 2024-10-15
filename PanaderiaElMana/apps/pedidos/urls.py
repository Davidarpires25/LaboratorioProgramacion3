from django.urls import path
from apps.pedidos import views 

app_name = 'pedidos'
urlpatterns = [
    path('', views.registroPedidos, name='registro_pedidos'),
]