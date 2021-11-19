from django.contrib import admin

from stak.models import (
    Transaction,
    TransactionCategory,
    TransactionSubcategory,
    Wallet,
)

admin.site.register(Transaction)
admin.site.register(TransactionCategory)
admin.site.register(TransactionSubcategory)
admin.site.register(Wallet)
