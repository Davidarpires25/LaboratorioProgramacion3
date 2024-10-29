from django.urls import path
from apps.productos import views 

app_name = 'productos'
urlpatterns = [
    path('', views.gestionarProductos, name='gestionarProductos'),
    path('editar/<int:pk>', views.editarProductos, name='editar_productos'),
    path('eliminar/<int:pk>', views.eliminarProductos, name='eliminar_productos'),
]