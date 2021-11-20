from rest_framework import viewsets
from stak.models.transaction import Transaction
from stak.serializers.transaction import TransactionSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(wallet_id=self.kwargs["wallet_pk"])
