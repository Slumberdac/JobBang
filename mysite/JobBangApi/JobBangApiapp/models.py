from django.db import models


class users(models.Model):
    email = models.CharField(max_length=255)
    hash = models.IntegerField()
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    is_candidate = models.BooleanField()

class candidate_info(models.Model):
    user_id = models.ForeignKey(users, on_delete=models.CASCADE)
    #more field later :)
    
class employer_info(models.Model):
    company_name = models.IntegerField()
    #more field later :)
class offers(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    employer_id = models.ForeignKey(employer_info, on_delete=models.CASCADE)
    
def __str__(self):
    return self.title