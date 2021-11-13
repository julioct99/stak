from django.contrib.auth.models import User
from django.db import models


class Wallet(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=75)
    balance = models.DecimalField(decimal_places=2, max_digits=16)
