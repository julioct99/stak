from django.db import models


class TransactionCategory(models.Model):
    name = models.CharField(max_length=75)

    class Meta:
        verbose_name_plural = "Transaction Categories"

    def __str__(self) -> str:
        return self.name
