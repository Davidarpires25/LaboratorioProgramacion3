from django.contrib.auth.forms import UserCreationForm
from .models import Usuario




class UsuarioForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = Usuario
        fields = UserCreationForm.Meta.fields+('cuit','perfil_usuario')