from django.urls import path
from apps.ventas import views 

app_name = 'ventas'
urlpatterns = [
    path('', views.registroVentas, name='registro_ventas'),
    path('informe/', views.informeVentas, name="informe_ventas"),
    path('crearMayorista/', views.registroMayoristas, name="registro_mayoristas"),
    path("informe/<int:id>", views.detalleVenta, name="detalle_venta"),
    path("anular/<int:id>", views.anularVenta, name="anular_venta")
]