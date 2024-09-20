from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.read_users, name="users"),
    path("users/<int:id>/", views.read_user, name="user_detail"),
    path("users/", views.create_user, name="user_create"),
    path("users/<int:id>/", views.update_user, name="user_update"),
    path("users/<int:id>/", views.delete_user, name="user_delete"),
    path("users/login/", views.login, name="login"),
    path("users/register/", views.register, name="register"),
    path("offers/", views.create_offer, name="create_offer"),
    path("offers/<int:id>/", views.read_offer, name="read_offer"),
    path("offers/", views.read_offers, name="read_offers"),
    path("offers/<int:id>/", views.update_offer, name="update_offer"),
    path("offers/<int:id>/", views.delete_offer, name="delete_offer"),
]
