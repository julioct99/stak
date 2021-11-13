from django.contrib import admin
from django.urls import path
from django.urls.conf import include

API_ROOT_URL = "api/"

urlpatterns = [
    path("admin/", admin.site.urls),
    path(API_ROOT_URL, include("stak.urls")),
]
