from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.read_users, name="users"),
    path("user/<int:id>/", views.read_user, name="user_detail"),
    path("user/", views.create_user, name="user_create"),
    # path('user/<int:id>/', views.update_user, name='user_update'),
    # path('user/<int:id>/', views.delete_user, name='user_delete'),
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
]
