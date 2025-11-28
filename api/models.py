from django.db import models
from django.contrib.auth.models import User

class Produto(models.Model):
    nome = models.CharField(max_length=255)
    descricao = models.TextField()
    quantidade = models.IntegerField()
    preco = models.FloatField()
    estoque = models.IntegerField()

class Movimentacao(models.Model):
    produto_id = models.ForeignKey(Produto, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=255)
    quantidade = models.IntegerField()
    usuario_id = models.ForeignKey(User, on_delete=models.CASCADE)
    data_operacao = models.DateTimeField()