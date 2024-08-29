from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    # specifies if the user is a job seeker or a job poster
    type = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
class Job(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    salary = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    skills = models.CharField(max_length=100)
    
    def __str__(self):
        return self.title
    
class company(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)

    
    def __str__(self):
        return self.name