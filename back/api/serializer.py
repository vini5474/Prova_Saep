from rest_framework import serializers
from .models import Produto, Movimentacao
from django.contrib.auth.models import User 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
    
    def create(self, validate_data):
        user = User.objects.create_user(
            username = validate_data['username'],
            password = validate_data['password']
        )
        return user
    
class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class MovimentacaoSerializer(serializers.ModelSerializer):
    usuario = serializers.ReadOnlyField(source='usuario.username')
    produto = ProdutoSerializer(read_only=True)
    produto_id = serializers.PrimaryKeyRelatedField(
        queryset = Produto.objects.all(), source='produto', write_only=True
    )

    class Meta:
        model = Movimentacao
        fields = ['id', 'produto', 'produto_id', 'tipo', 'quantidade', 'usuario', 'data_movimentacao']
        read_only_fields = ['usuario']

    def create(self, validated_data):
        request = self.context['request']
        validated_data['usuario'] = request.user
        return super().create(validated_data)
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token