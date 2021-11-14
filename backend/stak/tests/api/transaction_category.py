from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from stak.models import TransactionCategory
from stak.serializers import TransactionCategorySerializer

BASENAME = "categories"


class TransactionCategoryAPITests(APITestCase):
    categories = [{"name": "Category 1"}, {"name": "Category 2"}]
    category_fields = categories[0].keys()

    def setUp(self):
        for category in self.categories:
            instance = TransactionCategory.objects.create(**category)
            instance.save()

    def test_list_categories(self):
        url = reverse(f"{BASENAME}-list")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.categories))

        for index, category in enumerate(response.data):
            serializer = TransactionCategorySerializer(data=category)
            self.assertEqual(True, serializer.is_valid())
            instance = serializer.validated_data
            self.check_category_fields(instance, index)

    def test_create_category(self):
        url = reverse(f"{BASENAME}-list")
        data = {"name": "Category 3"}

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_category__400_bad_request(self):
        url = reverse(f"{BASENAME}-list")
        data = {"name": None}

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_category(self):
        url = reverse(f"{BASENAME}-detail", args=(1,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        serializer = TransactionCategorySerializer(data=response.data)
        self.assertEqual(True, serializer.is_valid())
        category = response.data

        self.check_category_fields(category, index=0)

    def test_get_category__404_not_found(self):
        url = reverse(f"{BASENAME}-detail", args=(999,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_category(self):
        list_url = reverse(f"{BASENAME}-list")
        detail_url = reverse(f"{BASENAME}-detail", args=(1,))

        list_response = self.client.get(list_url)
        original_category_count = len(list_response.data)

        delete_response = self.client.delete(detail_url)
        self.assertEqual(
            delete_response.status_code, status.HTTP_204_NO_CONTENT
        )

        list_response = self.client.get(list_url)
        new_category_count = len(list_response.data)

        self.assertEqual(new_category_count, original_category_count - 1)

    def test_delete_category__404_not_found(self):
        url = reverse(f"{BASENAME}-detail", args=(999,))

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Helper methods

    def check_category_fields(self, category, index):
        for field in self.category_fields:
            self.assertEqual(category[field], self.categories[index][field])
