from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.read_users, name="users"),
    path("user/<int:id>/", views.read_user, name="user_detail"),
    path("user/", views.create_user, name="user_create"),
    path("user/<int:id>/", views.update_user, name="user_update"),
    path("user/<int:id>/", views.delete_user, name="user_delete"),
    path("offer/", views.create_offer, name="create_offer"),
    path("offer/<int:id>/", views.read_offer, name="read_offer"),
    path("offers/", views.read_offers, name="read_offers"),
    path("offer/<int:id>/", views.update_offer, name="update_offer"),
    path("offer/<int:id>/", views.delete_offer, name="delete_offer"),
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
]