from django.db import models
from stak.models.transaction_category import TransactionCategory


class TransactionSubcategory(models.Model):
    category = models.ForeignKey(TransactionCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=75)

    class Meta:
        verbose_name_plural = "Transaction Subcategories"

    def __str__(self) -> str:
        return self.name
