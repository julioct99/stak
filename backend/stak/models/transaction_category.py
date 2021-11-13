from django.db import models


class TransactionCategory(models.Model):
    name = models.CharField(max_length=75)
