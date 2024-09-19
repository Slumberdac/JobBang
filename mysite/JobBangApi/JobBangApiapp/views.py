from django.http import HttpRequest
from django.shortcuts import render
from django.db import connection
from django.db.utils import IntegrityError
from django.contrib.auth import login as django_login
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json


@api_view(["GET"])
def index(request: HttpRequest):
    User.objects.get(username="fougeresjacob@gmail.com").delete()
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM users WHERE email = 'fougeresjacob@gmail.com'")
    return Response("Hello, world!")


# get user
@api_view(["GET"])
def read_users(request: HttpRequest):
    return Response("Hello, users!")


# return individual user
@api_view(["GET"])
def read_user(request: HttpRequest, id: int):
    return Response(f"Hello, user {id}!")


# create user
@api_view(["POST"])
def create_user(request: HttpRequest):
    return Response("Hello, new user!")


# update user
# @api_view(['PATCH'])
# def update_user(request: HttpRequest, id: int):
#    return Response(f"Hello, user {id} updated!")

# delete user
# @api_view(['DELETE'])
# def delete_user(request: HttpRequest, id: int):
#    return Response(f"Hello, user {id} deleted!")

# Auth


# login
@api_view(["POST"])
def login(request: HttpRequest):
    user = User.objects.get(username=request.data.get("email"))
    if user.check_password(request.data.get("password")):
        django_login(request, user)
        return Response(f"Hello, {user.first_name} {user.last_name}!")
    return Response("Invalid credentials!")


# register
@api_view(["POST"])
def register(request: HttpRequest):
    try:
        hash = (
            User.objects.create_user(
                username=request.data.get("email"),
                email=request.data.get("email"),
                password=request.data.get("password"),
                first_name=request.data.get("firstname"),
                last_name=request.data.get("lastname"),
            ).password,
        )
        # insert into users
        query = f"INSERT INTO users (email, hash, firstname, lastname, is_candidate) VALUES ('{request.data.get('email')}', '{hash[0]}', '{request.data.get('firstname')}', '{request.data.get('lastname')}', {request.data.get('is_candidate')}) RETURNING *;"
        with connection.cursor() as cursor:
            try:
                cursor.execute(query)
                data = cursor.fetchone()
                id = data["id"]
                # insert into candidates
                if request.data.get("is_candidate"):
                    query = f"INSERT INTO candidate_info (user_id, info) VALUES ({id}, '{request.data.get('info')}')"
                    cursor.execute(query)
                # insert into employers
                else:
                    query = f"INSERT INTO employer_info (user_id, company_name) VALUES ({id}, '{request.data.get('company_name')}')"
                    cursor.execute(query)
            except Exception as e:
                cursor.execute(
                    f"DELETE FROM users WHERE email = '{request.data.get('email')}'"
                )
                User.objects.get(username=request.data.get("email")).delete()
                print(e)
                return Response(f"Error: {e}")
    except IntegrityError:
        return Response("User already exists!")

    return Response(data)
