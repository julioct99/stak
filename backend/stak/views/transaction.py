from rest_framework import viewsets
from stak.models.transaction import Transaction
from stak.serializers.transaction import TransactionSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        if "subcategory_pk" in self.kwargs and "category_pk" in self.kwargs:
            return Transaction.objects.filter(
                subcategory_id=self.kwargs["subcategory_pk"],
                subcategory__category_id=self.kwargs["category_pk"],
            )
        elif (
            "category_pk" in self.kwargs
            and "subcategory_pk" not in self.kwargs
        ):
            return Transaction.objects.filter(
                subcategory__category_id=self.kwargs["category_pk"]
            )
        elif "wallet_pk" in self.kwargs:
            return Transaction.objects.filter(
                wallet_id=self.kwargs["wallet_pk"]
            )

        return []
