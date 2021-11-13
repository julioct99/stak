from django.db import models
from stak.models.transaction_subcategory import TransactionSubcategory
from stak.models.wallet import Wallet


class Transaction(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(
        TransactionSubcategory, on_delete=models.SET_NULL, null=True
    )
    amount = models.DecimalField(decimal_places=2, max_digits=16)
    creation_date = models.DateTimeField(auto_now_add=True)
    date = models.DateField()
