from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import UsuarioForm
from .models import Usuario

 
 
@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    add_form= UsuarioForm
    fieldsets= UserAdmin.fieldsets+ (
    (None, {'fields': ('cuit', 'perfil_usuario',)}),)
    add_fieldsets= UserAdmin.add_fieldsets+ (
    (None, {'fields': ('cuit', 'perfil_usuario',)}),)
    search_fields= ('email', 'cuit', 'username',)
    
