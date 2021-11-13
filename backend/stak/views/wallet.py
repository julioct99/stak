from rest_framework import viewsets
from stak.models.wallet import Wallet
from stak.serializers.wallet import WalletSerializer


class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
