from django.urls import path
from apps.productos import views 

app_name = 'productos'
urlpatterns = [
    path('', views.gestionarProductos, name='gestionarProductos'),
    path('<int:pk>', views.editarProductos, name='editar_productos'),
]