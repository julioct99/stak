from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from stak.models import TransactionCategory, TransactionSubcategory
from stak.serializers import TransactionSubcategorySerializer

BASENAME = "subcategories"


class TransactionSubcategoryAPITests(APITestCase):
    subcategories = [{"name": "subc1"}, {"name": "subc2"}]
    subcategory_fields = subcategories[0].keys()

    def setUp(self):
        category = TransactionCategory.objects.create(name="Test category")
        category.save()

        for subcategory in self.subcategories:
            instance = TransactionSubcategory.objects.create(
                **subcategory, category=category
            )
            instance.save()

    def test_list_subcategories(self):
        category = TransactionCategory.objects.get(id=1)
        url = reverse(f"{BASENAME}-list", args=(category.id,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.subcategories))

        for index, subcategory in enumerate(response.data):
            serializer = TransactionSubcategorySerializer(data=subcategory)
            self.assertEqual(True, serializer.is_valid())
            instance = serializer.validated_data
            self.check_subcategory_fields(instance, index)

    def test_create_subcategory(self):
        category = TransactionCategory.objects.get(id=1)
        url = reverse(f"{BASENAME}-list", args=(category.id,))
        data = {"name": "subc3", "category": category.id}

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_subcategory__400_bad_request(self):
        category = TransactionCategory.objects.get(id=1)
        url = reverse(f"{BASENAME}-list", args=(category.id,))
        data = {"name": "subc4"}

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_subcategory(self):
        category = TransactionCategory.objects.get(id=1)
        url = reverse(f"{BASENAME}-detail", args=(category.id, 1))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        serializer = TransactionSubcategorySerializer(data=response.data)
        self.assertEqual(True, serializer.is_valid())
        instance = serializer.validated_data
        self.check_subcategory_fields(instance, 0)

    def test_get_subcategory__404_not_found(self):
        category = TransactionCategory.objects.get(id=1)
        url = reverse(f"{BASENAME}-detail", args=(category.id, 999))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_subcategory(self):
        category = TransactionCategory.objects.get(id=1)
        list_url = reverse(f"{BASENAME}-list", args=(category.id,))
        detail_url = reverse(f"{BASENAME}-detail", args=(category.id, 1))

        list_response = self.client.get(list_url)
        original_subcategory_count = len(list_response.data)

        delete_response = self.client.delete(detail_url)
        self.assertEqual(
            delete_response.status_code, status.HTTP_204_NO_CONTENT
        )

        list_response = self.client.get(list_url)
        new_subcategory_count = len(list_response.data)

        self.assertEqual(new_subcategory_count, original_subcategory_count - 1)

    def test_delete_subcategory__404_not_found(self):
        category = TransactionCategory.objects.get(id=1)
        url = reverse(f"{BASENAME}-detail", args=(category.id, 999))

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Helper methods

    def check_subcategory_fields(self, subcategory, index):
        for field in self.subcategory_fields:
            self.assertEqual(
                subcategory[field], self.subcategories[index][field]
            )
