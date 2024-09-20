from django.test import TestCase
import requests

request = requests.get("https://127.0.0.1:8000")

print(request.json())
