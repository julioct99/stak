from rest_framework import viewsets
from stak.models.transaction import Transaction
from stak.serializers.transaction import TransactionSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
