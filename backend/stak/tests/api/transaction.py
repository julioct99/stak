from decimal import Decimal

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from stak.models import (
    Transaction,
    TransactionCategory,
    TransactionSubcategory,
    Wallet,
)
from stak.serializers import TransactionSerializer

BASENAME = "transactions"


class TransactionAPITests(APITestCase):
    transactions = [
        {
            "amount": 500.50,
            "date": "2021-11-17",
        },
        {
            "amount": -500.50,
            "date": "2021-11-18",
        },
        {
            "amount": -1000.55,
            "date": "2021-11-19",
        },
    ]
    transaction_fields = transactions[0].keys()

    def setUp(self):
        owner = User.objects.create(
            username="testuser", password="testpassword"
        )
        owner.save()

        wallet = Wallet.objects.create(
            balance=0, title="my wallet", owner=owner
        )
        wallet.save()

        category = TransactionCategory.objects.create(name="invest")
        category.save()

        subcategory = TransactionSubcategory.objects.create(
            name="Crypto", category=category
        )
        subcategory.save()

        for transaction in self.transactions:
            instance = Transaction.objects.create(
                **transaction, wallet=wallet, subcategory=subcategory
            )
            instance.save()

    def test_list_transactions(self):
        wallet = Wallet.objects.get(id=1)
        url = reverse(f"{BASENAME}-list", args=(wallet.id,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.transactions))

        for index, transaction in enumerate(response.data):
            serializer = TransactionSerializer(data=transaction)
            self.assertEqual(True, serializer.is_valid())
            self.check_transaction_fields(transaction, index)

    def test_create_transaction(self):
        wallet = Wallet.objects.get(id=1)
        url = reverse(f"{BASENAME}-list", args=(wallet.id,))
        subcategory = TransactionSubcategory.objects.get(id=1)
        data = {
            "amount": 255.52,
            "date": "2021-11-20",
            "wallet": wallet.id,
            "subcategory": subcategory.id,
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_transaction__400_bad_request(self):
        wallet = Wallet.objects.get(id=1)
        url = reverse(f"{BASENAME}-list", args=(wallet.id,))
        subcategory = TransactionSubcategory.objects.get(id=1)
        data = {
            "date": "2021-11-20",
            "wallet": wallet.id,
            "subcategory": subcategory.id,
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_transaction(self):
        wallet = Wallet.objects.get(id=1)
        url = reverse(f"{BASENAME}-detail", args=(wallet.id, 1))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        serializer = TransactionSerializer(data=response.data)
        self.assertEqual(True, serializer.is_valid())
        transaction = response.data

        self.check_transaction_fields(transaction, index=0)

    def test_get_transaction__404_not_found(self):
        wallet = Wallet.objects.get(id=1)
        url = reverse(f"{BASENAME}-detail", args=(wallet.id, 999))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_transaction(self):
        wallet = Wallet.objects.get(id=1)
        list_url = reverse(f"{BASENAME}-list", args=(wallet.id,))
        detail_url = reverse(f"{BASENAME}-detail", args=(wallet.id, 1))

        list_response = self.client.get(list_url)
        original_transaction_count = len(list_response.data)

        delete_response = self.client.delete(detail_url)
        self.assertEqual(
            delete_response.status_code, status.HTTP_204_NO_CONTENT
        )

        list_response = self.client.get(list_url)
        new_transaction_count = len(list_response.data)

        self.assertEqual(new_transaction_count, original_transaction_count - 1)

    def test_delete_transaction__404_not_found(self):
        wallet = Wallet.objects.get(id=1)
        url = reverse(f"{BASENAME}-detail", args=(wallet.id, 999))

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Helper methods

    def check_transaction_fields(self, transaction, index):
        for attribute in self.transaction_fields:
            # Special case for decimal fields
            if attribute == "amount":
                self.assertAlmostEqual(
                    Decimal(transaction[attribute]),
                    Decimal(self.transactions[index][attribute]),
                )
                continue

            self.assertEqual(
                transaction[attribute], self.transactions[index][attribute]
            )
