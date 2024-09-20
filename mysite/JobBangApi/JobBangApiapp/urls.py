from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.read_users, name="users"),
    path("users/<int:id>/", views.read_user, name="user_detail"),
    # path('users/<int:id>/', views.update_user, name='user_update'),
    # path('users/<int:id>/', views.delete_user, name='user_delete'),
    path("users/login/", views.login, name="login"),
    path("users/register/", views.register, name="register"),
]
