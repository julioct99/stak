from decimal import Decimal

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from stak.models import Wallet
from stak.serializers import WalletSerializer

BASENAME = "wallets"


class WalletAPITests(APITestCase):
    wallets = [
        {
            "title": "Test wallet title",
            "balance": -125.75,
        },
        {
            "title": "A second wallet",
            "balance": 500,
        },
    ]
    wallet_fields = wallets[0].keys()

    def setUp(self):
        owner = User.objects.create(
            username="testuser", password="testpassword"
        )
        owner.save()

        for wallet in self.wallets:
            instance = Wallet.objects.create(**wallet, owner=owner)
            instance.save()

    def test_list_wallets(self):
        url = reverse(f"{BASENAME}-list")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.wallets))

        for index, wallet in enumerate(response.data):
            serializer = WalletSerializer(data=wallet)
            self.assertEqual(True, serializer.is_valid())
            instance = serializer.validated_data

            self.check_wallet_fields(
                api_wallet=instance, local_wallet=self.wallets[index]
            )

    def test_create_wallet(self):
        url = reverse(f"{BASENAME}-list")
        owner = User.objects.get(id=1)
        data = {
            "title": self.wallets[0]["title"],
            "balance": self.wallets[0]["balance"],
            "owner": owner.id,
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_wallet__400_bad_request(self):
        url = reverse(f"{BASENAME}-list")
        owner = User.objects.get(id=1)
        data = {
            "title": self.wallets[0]["title"],
            "owner": owner.id,
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_wallet(self):
        url = reverse(f"{BASENAME}-detail", args=(1,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        serializer = WalletSerializer(data=response.data)
        self.assertEqual(True, serializer.is_valid())
        instance = serializer.validated_data
        self.check_wallet_fields(
            api_wallet=instance, local_wallet=self.wallets[0]
        )

    def test_get_wallet__404_not_found(self):
        url = reverse(f"{BASENAME}-detail", args=(999,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_wallet(self):
        list_url = reverse(f"{BASENAME}-list")
        detail_url = reverse(f"{BASENAME}-detail", args=(1,))

        list_response = self.client.get(list_url)
        original_wallet_count = len(list_response.data)

        delete_response = self.client.delete(detail_url)
        self.assertEqual(
            delete_response.status_code, status.HTTP_204_NO_CONTENT
        )

        list_response = self.client.get(list_url)
        new_wallet_count = len(list_response.data)

        self.assertEqual(new_wallet_count, original_wallet_count - 1)

    def test_delete_wallet__404_not_found(self):
        url = reverse(f"{BASENAME}-detail", args=(999,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Helper methods

    def check_wallet_fields(self, api_wallet: object, local_wallet: object):
        """Checks all the field values of a wallet from the API against the local test data

        Args:
            api_wallet (object): Wallet object returned in the API response data
            local_wallet (object): Wallet object in the local test data
        """
        for field in self.wallet_fields:
            if field == "balance":
                self.assertEqual(
                    Decimal(api_wallet[field]), Decimal(local_wallet[field])
                )
                continue

            self.assertEqual(api_wallet[field], local_wallet[field])
