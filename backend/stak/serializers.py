from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Transaction, TransactionCategory, TransactionSubcategory, Wallet


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


class TransactionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionCategory
        fields = "__all__"


class TransactionSubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionSubcategory
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = "__all__"
