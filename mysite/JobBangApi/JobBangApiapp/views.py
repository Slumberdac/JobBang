import json

from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core import serializers
from django.db import connection
from django.db import models as django_models
from django.db.utils import Error
from django.http import HttpRequest
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import models


@api_view(["GET"])
def read_users(request: HttpRequest):
    """
    users/ endpoint
    Returns a list of all users in the database
    """
    data = list(models.user.objects.all().values())
    return Response(to_json(models.response(success=True, data=data)))


@api_view(["GET"])
def read_candidates(request: HttpRequest):
    """
    users/candidates/ endpoint
    Returns a list of all candidates in the database
    """
    data = list(models.user.objects.filter(is_candidate=True).values())
    return Response(to_json(models.response(success=True, data=data)))


@api_view(["GET"])
def read_employers(request: HttpRequest):
    """
    users/employers/ endpoint
    """
    data = list(models.user.objects.filter(is_candidate=False).values())
    return Response(to_json(models.response(success=True, data=data)))


@api_view(["GET", "PATCH", "DELETE"])
def specific_user(request: HttpRequest, id_: int):
    """
    users/<int:id>/ endpoint
    GET: Returns a single user from the database
    DELETE: Deletes a single user from the database
    """
    user = models.user.objects.filter(id=id_)
    if not user:
        return error_response("User not found!")

    if request.method == "GET":
        print(dir(request.session))
        return Response(
            to_json(models.response(success=True, data=list(user.values())[0]))
        )
    elif request.method == "PATCH":
        pass
    elif request.method == "DELETE":
        if not request.session:
            return error_response("Unauthorized!")

    try:
        User.objects.get().delete()
        user.delete()
        django_logout(request)
        return Response(to_json(models.response(success=True)), 204)
    except models.user.DoesNotExist:
        return error_response("User not found!")


# @api_view(["PATCH"])
# def update_user(request: HttpRequest, id_: int):
#     data = request.data
#     query = """
#     UPDATE users
#     SET title = %s, description = %s, email = %s, phone = %s
#     WHERE id = %s
#     RETURNING *;
#     """
#     values = (
#         data.get("title"),
#         data.get("description"),
#         data.get("email"),
#         data.get("phone"),
#         id_,
#     )

#     with connection.cursor() as cursor:
#         try:
#             cursor.execute(query, values)
#             user = cursor.fetchone()
#             if user:
#                 return Response(user)
#             else:
#                 return Response({"error": "User not found"}, status=404)
#         except Error as e:
#             return Response({"error": str(e)}, status=500)


@api_view(["GET", "POST"])
def login(request: HttpRequest):
    """
    users/login/ endpoint
    Logs a user by checking the credentials and creating a sessionid
    """
    user = User.objects.get(username=request.data.get("email"))
    if user.check_password(request.data.get("password")):
        django_login(request, user)
        return Response(to_json(models.response(success=True)))
    return error_response("Invalid credentials!")


@api_view(["POST"])
def register(request: HttpRequest):
    """
    users/register/ endpoint
    Registers a new user and inserts the user into the database
    Also adds a sessionid to the request
    """
    user = None
    try:
        user = models.user(
            email=request.data.get("email"),
            hash=request.data.get("password"),
            firstname=request.data.get("firstname"),
            lastname=request.data.get("lastname"),
            is_candidate=request.data.get("is_candidate"),
        )
        user.hash = User.objects.create_user(
            username=user.email,
            email=user.email,
            password=user.hash,
        ).password
        print(user.hash)
        django_login(request, User.objects.get(username=user.email))
        user.save()

        if user.is_candidate:
            candidate_info = models.candidate_info(
                user_id=user.id, info=request.data.get("info")
            )
            candidate_info.save()
        else:
            employer_info = models.employer_info(
                user_id=user.id, company_name=request.data.get("company_name")
            )
            employer_info.save()
    except Error as e:
        if user:
            User.objects.get(username=user.email).delete()
            try:
                user.delete()
            except ValueError:
                pass
        return error_response(str(e))
    response = models.response(success=True, data=to_json(user))
    return Response(to_json(response), 201)


@api_view(["POST"])
def logout(request: HttpRequest):
    django_logout(request)
    return Response(to_json(models.response(success=True)))


# Offers Endpoints


# create offer
@api_view(["POST"])
def create_offer(request: HttpRequest):
    query = "INSERT INTO offers (title, description, email, phone, employer_id) VALUES (%s, %s, %s, %s, %s) RETURNING *;"
    data = request.data
    values = (
        data.get("title"),
        data.get("description"),
        data.get("email"),
        data.get("phone"),
        data.get("employer_id"),
    )

    with connection.cursor() as cursor:
        try:
            cursor.execute(query, values)
            data = cursor.fetchone()
            id = data[0]
            return Response({"id": id, "message": "Offer created successfully!"})
        except Error as e:
            return Response({"error": str(e)}, status=500)


# read offer
@api_view(["GET"])
def read_offer(request: HttpRequest, id: int):
    offer = models.offer.objects.filter(id=id)
    if not offer:
        return error_response("Offer not found!")


# read offers
@api_view(["GET"])
def read_offers(request: HttpRequest):
    query = "SELECT * FROM offers;"

    with connection.cursor() as cursor:
        try:
            cursor.execute(query)
            offers = cursor.fetchall()
            return Response(offers)
        except Error as e:
            return Response({"error": str(e)}, status=500)


# update offer
@api_view(["PATCH"])
def update_offer(request: HttpRequest, id: int):
    data = request.data
    query = """
    UPDATE offers
    SET title = %s, description = %s, email = %s, phone = %s
    WHERE id = %s
    RETURNING *;
    """
    values = (
        data.get("title"),
        data.get("description"),
        data.get("email"),
        data.get("phone"),
        id,
    )

    with connection.cursor() as cursor:
        try:
            cursor.execute(query, values)
            offer = cursor.fetchone()
            if offer:
                return Response(offer)
            else:
                return Response({"error": "Offer not found"}, status=404)
        except Error as e:
            return Response({"error": str(e)}, status=500)


# delete offer
@api_view(["DELETE"])
def delete_offer(request: HttpRequest, id: int):
    query = "DELETE FROM offers WHERE id = %s RETURNING *;"

    with connection.cursor() as cursor:
        try:
            cursor.execute(query, (id))
            offer = cursor.fetchone()
            if offer:
                return Response({"message": "Offer deleted successfully!"})
            else:
                return Response({"error": "Offer not found"}, status=404)
        except Error as e:
            return Response({"error": str(e)}, status=500)


def to_json(model: django_models.Model) -> dict:
    """
    Converts a Django model to a dictionary
    """
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
    """
    Returns a response with an error
    """
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
    elif message.startswith("invalid input syntax for type"):
        response = models.response(
            success=False,
            error={
                "message": "Invalid data!",
                message.split("DETAIL:  ")[1].split(" ")[0]: "Invalid data type!",
            },
        )
        return Response(to_json(response), 400)
    elif message.startswith("Unauthorized!"):
        response = models.response(
            success=False,
            error={
                "message": "Unauthorized!",
            },
        )
        return Response(to_json(response), 401)
    elif message.startswith("Invalid credentials!"):
        response = models.response(
            success=False,
            error={
                "message": "Invalid credentials!",
            },
        )
        return Response(to_json(response), 400)
    elif "not found" in message:
        response = models.response(
            success=False,
            error={
                "message": message,
            },
        )
        return Response(to_json(response), 404)
    else:
        response = models.response(
            success=False,
            error={
                "message": "Internal server error!",
                "error": message,
            },
        )
        return Response(to_json(response), 500)
