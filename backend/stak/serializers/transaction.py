from rest_framework import serializers
from stak.models.transaction import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(max_digits=16, decimal_places=2)

    class Meta:
        model = Transaction
        fields = "__all__"
