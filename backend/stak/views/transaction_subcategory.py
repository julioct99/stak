from rest_framework import viewsets
from stak.models.transaction_subcategory import TransactionSubcategory
from stak.serializers.transaction_subcategory import (
    TransactionSubcategorySerializer,
)


class TransactionSubcategoryViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSubcategorySerializer

    def get_queryset(self):
        return TransactionSubcategory.objects.filter(
            category_id=self.kwargs["category_pk"]
        )
