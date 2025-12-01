from django.shortcuts import render
from django.db.models import F
from django.db import transaction
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView
from .models import Produto, Movimentacao
from .serializer import ProdutoSerializer, MovimentacaoSerializer

class ProdutoView(ListCreateAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def abaixo_minimo(self, request):
        produtos = Produto.objects.filter(quantidade__lt=F('estoque_minimo'))
        serializer = self.get_serializer(produtos, many=True)
        return Response(serializer.data)

class MovimentacaoViewSet(ListCreateAPIView):
    queryset = Movimentacao.objects.all().order_by('-data_movimentacao')
    serializer_class = MovimentacaoSerializer
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        produto = Produto.objects.get(id=serializer.validated_data["produto"].id)
        qtd_mov = serializer.validated_data["quantidade"]
        tipo = serializer.validated_data["tipo"]

       # Atualiza o estoque
        if tipo == "entrada":
            Produto.objects.filter(id=produto.id).update(quantidade=F('quantidade') + qtd_mov)
        else:
            Produto.objects.filter(id=produto.id).update(quantidade=F('quantidade') - qtd_mov)

        # Recarrega o produto atualizado
        produto.refresh_from_db()

        # Cria a movimentação
        movimentacao = Movimentacao.objects.create(
            produto=produto,
            tipo=tipo,
            quantidade=qtd_mov,
            usuario=request.user,
        )

        saida = MovimentacaoSerializer(movimentacao)
        return Response(saida.data, status=status.HTTP_201_CREATED)
