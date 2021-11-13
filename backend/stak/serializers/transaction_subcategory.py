from rest_framework import serializers
from stak.models.transaction_subcategory import TransactionSubcategory


class TransactionSubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionSubcategory
        fields = "__all__"
