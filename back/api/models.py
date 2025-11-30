from django.db import models
from django.contrib.auth.models import User

class Produto(models.Model):
    nome = models.CharField(max_length=255)
    descricao = models.TextField()
    quantidade = models.IntegerField()
    preco = models.FloatField()
    estoque_minimo = models.IntegerField()

class Movimentacao(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=17)
    quantidade = models.IntegerField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    data_movimentacao = models.DateTimeField(auto_now_add=True)