from django.urls import path

from . import views

urlpatterns = [
    path("users/", views.read_users, name="users"),
    path("users/candidates/", views.read_candidates, name="candidates"),
    path("users/employers/", views.read_employers, name="employers"),
    path("users/<int:id_>/", views.specific_user, name="user"),
    path("users/login/", views.login, name="login"),
    path("users/register/", views.register, name="register"),
    path("users/logout/", views.logout, name="logout"),
    path("offers/", views.create_offer, name="create_offer"),
    path("offers/<int:id_>/", views.read_offer, name="read_offer"),
    path("offers/", views.read_offers, name="read_offers"),
    path("offers/<int:id_>/", views.update_offer, name="update_offer"),
    path("offers/<int:id_>/", views.delete_offer, name="delete_offer"),
]
