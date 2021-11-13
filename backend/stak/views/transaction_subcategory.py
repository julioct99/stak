from rest_framework import viewsets
from stak.models.transaction_subcategory import TransactionSubcategory
from stak.serializers.transaction_subcategory import (
    TransactionSubcategorySerializer,
)


class TransactionSubcategoryViewSet(viewsets.ModelViewSet):
    queryset = TransactionSubcategory.objects.all()
    serializer_class = TransactionSubcategorySerializer
