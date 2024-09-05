from django.shortcuts import render
from django.http import HttpResponse

#Nous devrions creer un autre fichier contenant la vue et retourner ceci mais ce simple print suffira pour le moment
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
