from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def index(request):
    return Response("Hello, world!")

#get user
@api_view(['GET'])
def read_users(request):
    return Response("Hello, users!")

#return individual user
@api_view(['GET'])
def read_user(request, id):
    return Response(f"Hello, user {id}!")

#create user
@api_view(['POST'])
def create_user(request):
    return Response("Hello, new user!")

#update user
#@api_view(['PATCH'])
#def update_user(request, id):
#    return Response(f"Hello, user {id} updated!")

#delete user
#@api_view(['DELETE'])
#def delete_user(request, id):
#    return Response(f"Hello, user {id} deleted!")


