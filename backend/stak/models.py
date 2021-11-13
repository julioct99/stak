from django.contrib.auth.models import User
from django.db import models


class TransactionCategory(models.Model):
    name = models.CharField(max_length=75)


class TransactionSubcategory(models.Model):
    category = models.ForeignKey(TransactionCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=75)


class Wallet(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=75)
    balance = models.DecimalField(decimal_places=2, max_digits=16)


class Transaction(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(
        TransactionSubcategory, on_delete=models.SET_NULL, null=True
    )
    amount = models.DecimalField(decimal_places=2, max_digits=16)
    creation_date = models.DateTimeField(auto_now_add=True)
    date = models.DateField()
