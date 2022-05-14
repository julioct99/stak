from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from stak.models.transaction_subcategory import TransactionSubcategory
from stak.models.wallet import Wallet


class Transaction(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(
        TransactionSubcategory, on_delete=models.SET_NULL, null=True
    )
    amount = models.DecimalField(decimal_places=2, max_digits=16)
    description = models.CharField(max_length=100, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    date = models.DateField()

    def __str__(self) -> str:
        return f"{self.wallet.title} ({self.date}): {self.amount}"


@receiver(post_save, sender=Transaction, dispatch_uid="update_wallet_balance")
def update_wallet(sender, instance, **kwargs):
    wallet = instance.wallet
    transaction_amount = instance.amount
    wallet.balance += transaction_amount
    wallet.save()
