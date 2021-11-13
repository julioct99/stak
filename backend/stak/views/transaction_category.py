from rest_framework import viewsets
from stak.models.transaction_category import TransactionCategory
from stak.serializers.transaction_category import TransactionCategorySerializer


class TransactionCategoryViewSet(viewsets.ModelViewSet):
    queryset = TransactionCategory.objects.all()
    serializer_class = TransactionCategorySerializer
