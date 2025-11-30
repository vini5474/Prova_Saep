from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from .views import ProdutoView, MovimentacaoViewSet
from .serializer import TokenObtainPairSerializer

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(serializer_class=TokenObtainPairSerializer), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('produtos/', ProdutoView.as_view()),
    path('movimentacao/', MovimentacaoViewSet.as_view()),
]