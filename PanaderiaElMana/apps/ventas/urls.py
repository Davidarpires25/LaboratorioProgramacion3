from django.urls import path
from apps.ventas import views 

app_name = 'ventas'
urlpatterns = [
    path('', views.registroVentas, name='registro_ventas'),
    path('crearMayorista/', views.registroMayoristas, name="registro_mayoristas")
]