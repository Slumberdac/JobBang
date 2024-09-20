from django.http import HttpRequest
from django.db import connection, models as django_models
from django.db.utils import Error
from django.contrib.auth import login as django_login
from django.contrib.auth.models import User
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from . import models


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
        return Response(to_json(models.response(success=True)))
    return error_response("Invalid credentials!")


# register
@api_view(["POST"])
def register(request: HttpRequest):
    """
    users/register/ endpoint
    Registers a new user and inserts the user into the database
    Also adds
    """
    try:
        user = models.user(
            email=request.data.get("email"),
            hash=request.data.get("password"),
            firstname=request.data.get("firstname"),
            lastname=request.data.get("lastname"),
            is_candidate=request.data.get("is_candidate"),
        )
        user.password = (
            User.objects.create_user(
                username=user.email,
                email=user.email,
                password=user.hash,
            ).password,
        )
        django_login(request, User.objects.get(username=user.email))

        # insert into users
        query = "INSERT INTO users (email, hash, firstname, lastname, is_candidate) VALUES (%s, %s, %s, %s, %s) RETURNING *;"
        values = (
            user.email,
            user.hash,
            user.firstname,
            user.lastname,
            user.is_candidate,
        )
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            data = cursor.fetchone()
            user._id = data[0]
            user.save()  # save user to get the id

            # insert into candidates
            if request.data.get("is_candidate"):
                candidate_info = models.candidate_info(
                    user_id=user, info=request.data.get("info")
                )
                query = "INSERT INTO candidate_info (user_id, info) VALUES (%s, %s);"
                values = (candidate_info.user_id._id, candidate_info.info)
                cursor.execute(query, values)

            # insert into employers
            else:
                employer_info = models.employer_info(
                    user_id=user, company_name=request.data.get("company_name")
                )
                query = (
                    "INSERT INTO employer_info (user_id, company_name) VALUES (%s, %s);"
                )
                values = (employer_info.user_id._id, employer_info.company_name)
                cursor.execute(query, values)
    except Error as e:
        User.objects.get(username=user.email).delete()
        return error_response(str(e))
    response = models.response(success=True, data=to_json(user))
    return Response(to_json(response), 201)


def to_json(model: django_models.Model) -> dict:
    model_dict: dict = json.loads(serializers.serialize("json", [model]))[0]["fields"]
    if isinstance(model, models.response):
        pop_fields = []
        for key, value in model_dict.items():
            if value is None:
                pop_fields.append(key)
        for field in pop_fields:
            model_dict.pop(field)
    return model_dict


def error_response(message: str) -> Response:
    if message.startswith("insert or update on table"):
        response = models.response(
            success=False,
            error={
                "message": "Invalid data!",
                message.split("DETAIL:  Key (")[1].split(")")[
                    0
                ]: f"{message.split('DETAIL:  Key (')[1].split(')', 1)[1].split('=(')[1].split(')')[0]} does not exist!",
            },
        )
        return Response(to_json(response), 400)
    elif message.startswith("duplicate key value violates unique constraint"):
        response = models.response(
            success=False,
            error={
                "message": "Duplicate data!",
                message.split("DETAIL:  Key (")[1].split(")")[
                    0
                ]: f"{message.split('DETAIL:  Key (')[1].split(')', 1)[1].split('=(')[1].split(')')[0]} already exists!",
            },
        )
        return Response(to_json(response), 400)
    elif message.startswith("null value in column"):
        response = models.response(
            success=False,
            error={
                "message": "Invalid data!",
                message.split('null value in column "')[1].split('"')[
                    0
                ]: "Required field!",
            },
        )
        return Response(to_json(response), 400)
    else:
        response = models.response(
            success=False,
            error={
                "message": "Internal server error!",
                "error": message,
            },
        )
        return Response(to_json(response), 500)
