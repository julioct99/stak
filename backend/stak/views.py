from django.contrib.auth import get_user_model
from rest_framework import viewsets

from .models import (
    Transaction,
    TransactionCategory,
    TransactionSubcategory,
    User,
    Wallet,
)
from .serializers import (
    TransactionCategorySerializer,
    TransactionSerializer,
    TransactionSubcategorySerializer,
    UserSerializer,
    WalletSerializer,
)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionCategoryViewSet(viewsets.ModelViewSet):
    queryset = TransactionCategory.objects.all()
    serializer_class = TransactionCategorySerializer


class TransactionSubcategorySerializer(viewsets.ModelViewSet):
    queryset = TransactionSubcategory.objects.all()
    serializer_class = TransactionSubcategorySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
