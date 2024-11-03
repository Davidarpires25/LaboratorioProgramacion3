from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.



class Usuario(AbstractUser):
    cuit= models.CharField(max_length=11)
    PERFILES_USUARIO = [
    ('Administrador', 'Administrador'),
    ('Vendedor', 'Vendedor'),
    ('Almacenero', 'Almacenero'),
    ('Gerente', 'Gerente'),
    ]
    perfil_usuario = models.CharField(max_length=50, choices=PERFILES_USUARIO)



class Empleado(models.Model):
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    cuit = models.CharField(max_length=11, unique=True)
    fecha_de_nacimiento = models.DateField()
    fecha_de_ingreso = models.DateField()
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)


    def __str__(self):
        return self.nombre_completo