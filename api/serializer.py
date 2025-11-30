from rest_framework import serializers
from .models import Produto, Movimentacao
from django.contrib.auth.models import User 

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

    class Meta:
        model = Movimentacao
        fields = '__all__'
        read_only_fields = ['usuario']

    def create(self, validated_data):
        request = self.context['request']
        validated_data['usuario'] = request.user
        return super().create(validated_data)