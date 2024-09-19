from django.http import HttpRequest
from django.shortcuts import render
from django.db import DatabaseError, connection
from django.db.utils import IntegrityError
from django.contrib.auth import login as django_login
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from .models import users, candidate_info, employer_info, offers


@api_view(["GET"])
def index(request: HttpRequest):
    return Response("Hello, world!")


# get users
@api_view(["GET"])
def read_users(request: HttpRequest):
    query = "SELECT * FROM users;"
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query)
            users = cursor.fetchall()
            # Assuming the cursor returns a list of dictionaries
            return Response(users)
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)


# return individual user
@api_view(["GET"])
def read_user(request: HttpRequest, id: int):
    query = "SELECT * FROM users WHERE id = %s;"
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query, [id])
            user = cursor.fetchone()
            if user:
                return Response(user)
            else:
                return Response({"error": "User not found"}, status=404)
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)

# delete user
@api_view(["DELETE"])
def delete_user(request: HttpRequest, id: int):
    query = "DELETE FROM users WHERE id = %s RETURNING *;"
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query, [id])
            user = cursor.fetchone()
            if user:
                return Response({"message": "User deleted successfully!"})
            else:
                return Response({"error": "User not found"}, status=404)
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)
        
# patch user
@api_view(["PATCH"])
def update_user(request: HttpRequest, id: int):
    data = request.data
    query = """
    UPDATE users 
    SET title = %s, description = %s, email = %s, phone = %s 
    WHERE id = %s 
    RETURNING *;
    """
    values = (data.get('title'), data.get('description'), data.get('email'), data.get('phone'), id)
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query, values)
            user = cursor.fetchone()
            if user:
                return Response(user)
            else:
                return Response({"error": "User not found"}, status=404)
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)

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
        # hash = (
        #     User.objects.create_user(
        #         username=request.data.get("email"),
        #         email=request.data.get("email"),
        #         password=request.data.get("password"),
        #         first_name=request.data.get("firstname"),
        #         last_name=request.data.get("lastname"),
        #     ).password,
        # )
        # insert into users
        query = f"INSERT INTO users (email, hash, firstname, lastname, is_candidate) VALUES ('{request.data.get('email')}', '{request.data.get("password")}', '{request.data.get('firstname')}', '{request.data.get('lastname')}', {request.data.get('is_candidate')}) RETURNING *;"
        with connection.cursor() as cursor:
            try:
                cursor.execute(query)
                data = cursor.fetchone()
                id = data[0]
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

#create offer
@api_view(["POST"])
def create_offer(request: HttpRequest):
    query = "INSERT INTO offers (title, description, email, phone, employer_id) VALUES (%s, %s, %s, %s, %s) RETURNING *;"
    data = request.data
    values = (data.get('title'), data.get('description'), data.get('email'), data.get('phone'), data.get('employer_id'))
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query, values)
            data = cursor.fetchone()
            id = data[0]
            return Response({"id": id, "message": "Offer created successfully!"})
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)

#read offer
@api_view(["GET"])
def read_offer(request: HttpRequest, id: int):
    query = "SELECT * FROM offers WHERE id = %s;"
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query, [id])
            offer = cursor.fetchone()
            if offer:
                return Response(offer)
            else:
                return Response({"error": "Offer not found"}, status=404)
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)

#read offers
@api_view(["GET"])
def read_offers(request: HttpRequest):
    query = "SELECT * FROM offers;"
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query)
            offers = cursor.fetchall()
            return Response(offers)
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)

#update offer
@api_view(["PATCH"])
def update_offer(request: HttpRequest, id: int):
    data = request.data
    query = """
    UPDATE offers 
    SET title = %s, description = %s, email = %s, phone = %s 
    WHERE id = %s 
    RETURNING *;
    """
    values = (data.get('title'), data.get('description'), data.get('email'), data.get('phone'), id)
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query, values)
            offer = cursor.fetchone()
            if offer:
                return Response(offer)
            else:
                return Response({"error": "Offer not found"}, status=404)
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)

#delete offer
@api_view(["DELETE"])
def delete_offer(request: HttpRequest, id: int):
    query = "DELETE FROM offers WHERE id = %s RETURNING *;"
    
    with connection.cursor() as cursor:
        try:
            cursor.execute(query, [id])
            offer = cursor.fetchone()
            if offer:
                return Response({"message": "Offer deleted successfully!"})
            else:
                return Response({"error": "Offer not found"}, status=404)
        except DatabaseError as e:
            return Response({"error": str(e)}, status=500)       