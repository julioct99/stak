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
    r"transactions", TransactionViewSet, basename="transactions"
)

# Categories
categories_router = routers.NestedSimpleRouter(
    router, r"categories", lookup="category"
)
categories_router.register(
    r"subcategories", TransactionSubcategoryViewSet, basename="subcategories"
)
categories_router.register(
    r"transactions", TransactionViewSet, basename="transactions"
)

# Subcategories
subcategories_router = routers.NestedSimpleRouter(
    categories_router, r"subcategories", lookup="subcategory"
)
subcategories_router.register(
    r"transactions", TransactionViewSet, basename="transactions"
)

urlpatterns = [
    path(r"", include(router.urls)),
    path(r"", include(wallets_router.urls)),
    path(r"", include(categories_router.urls)),
    path(r"", include(subcategories_router.urls)),
]
