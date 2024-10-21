from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    cuit = models.IntegerField(null=True)
    perfil_usuario= models.CharField(max_length=50)


   