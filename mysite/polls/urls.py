from django.urls import path

from . import views

#retourne la fonction index de views.py
urlpatterns = [
    path("", views.index, name="index"),
]