from rest_framework import serializers
from stak.models.wallet import Wallet


class WalletSerializer(serializers.ModelSerializer):
    balance = serializers.DecimalField(max_digits=16, decimal_places=2)

    class Meta:
        model = Wallet
        fields = "__all__"
