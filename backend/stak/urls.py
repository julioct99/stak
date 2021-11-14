from django.db.models import base
from django.urls import path
from django.urls.conf import include
from rest_framework_nested import routers

from .views import (
    TransactionCategoryViewSet,
    TransactionSubcategoryViewSet,
    TransactionViewSet,
    UserViewSet,
    WalletViewSet,
)

router = routers.SimpleRouter()
router.register(r"users", UserViewSet, basename="users")
router.register(r"wallets", WalletViewSet, basename="wallets")
router.register(
    r"categories", TransactionCategoryViewSet, basename="categories"
)

# Wallets
wallets_router = routers.NestedSimpleRouter(
    router, r"wallets", lookup="wallet"
)
wallets_router.register(
    r"transactions", TransactionViewSet, basename="wallet-transactions"
)

# Categories
categories_router = routers.NestedSimpleRouter(
    router, r"categories", lookup="category"
)
categories_router.register(
    r"subcategories", TransactionSubcategoryViewSet, basename="subcategories"
)

urlpatterns = [
    path(r"", include(router.urls)),
    path(r"", include(wallets_router.urls)),
    path(r"", include(categories_router.urls)),
]
