from django.db import models


class user(models.Model):
    email = models.TextField(unique=True)
    hash = models.TextField()
    firstname = models.TextField()
    lastname = models.TextField()
    is_candidate = models.BooleanField()


class candidate_info(models.Model):
    user = models.ForeignKey(
        user,
        on_delete=models.CASCADE,
        unique=True,
    )
    info = models.TextField(null=True, blank=True)
    # more field later :)


class employer_info(models.Model):
    user = models.ForeignKey(
        user,
        on_delete=models.CASCADE,
        unique=True,
    )
    company_name = models.TextField(null=True, blank=True)
    # more field later :)


class offer(models.Model):
    title = models.TextField()
    description = models.TextField()
    email = models.TextField()
    phone = models.TextField()
    employer = models.ForeignKey(
        employer_info,
        on_delete=models.CASCADE,
    )


class response(models.Model):
    success = models.BooleanField(default=True)
    data = models.JSONField(null=True, blank=True)
    error = models.JSONField(null=True, blank=True)


def __str__(self):
    return self.title
