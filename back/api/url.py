from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from .views import ProdutoView, ProdutoDetailView, MovimentacaoViewSet
from .serializer import CustomTokenObtainPairSerializer

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('produtos/', ProdutoView.as_view()),
    path('produtos/<int:pk>', ProdutoDetailView.as_view()),
    path('movimentacao/', MovimentacaoViewSet.as_view()),
]