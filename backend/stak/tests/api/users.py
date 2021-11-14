from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from stak.models import User

BASENAME = "users"


class UserAPITests(APITestCase):
    users = [
        {
            "username": "user_one",
            "email": "user_one@gmail.com",
        },
        {"username": "user_two", "email": "user_two@gmail.com"},
    ]

    user_fields = users[0].keys()

    def setUp(self):
        for user in self.users:
            instance = User.objects.create(**user)
            instance.save()

    def test_list_users(self):
        url = reverse(f"{BASENAME}-list")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.users))

        for index, user in enumerate(response.data):
            for attribute in self.user_fields:
                self.assertEqual(user[attribute], self.users[index][attribute])

    # TODO test_create_user
    # TODO test_create_user__400_bad_request

    def test_get_user(self):
        url = reverse(f"{BASENAME}-detail", args=(1,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user = response.data
        for attribute in self.user_fields:
            self.assertEqual(user[attribute], self.users[0][attribute])

    def test_get_user__404_not_found(self):
        url = reverse(f"{BASENAME}-detail", args=(999,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_user(self):
        list_url = reverse(f"{BASENAME}-list")
        detail_url = reverse(f"{BASENAME}-detail", args=(1,))

        list_response = self.client.get(list_url)
        original_user_count = len(list_response.data)

        delete_response = self.client.delete(detail_url)
        self.assertEqual(
            delete_response.status_code, status.HTTP_204_NO_CONTENT
        )

        list_response = self.client.get(list_url)
        new_user_count = len(list_response.data)

        self.assertEqual(new_user_count, original_user_count - 1)

    def test_delete_user__404_not_found(self):
        url = reverse(f"{BASENAME}-detail", args=(999,))

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
