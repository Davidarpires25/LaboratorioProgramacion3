from django.urls import path
from apps.ventas import views 

app_name = 'ventas'
urlpatterns = [
    path('', views.registroVentas, name='registro_ventas'),
    path('informe/', views.informeVentas, name="informe_ventas")
]