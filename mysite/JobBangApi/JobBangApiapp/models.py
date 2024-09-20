from django.db import models


class user(models.Model):
    _id = models.IntegerField(null=True, unique=True)
    email = models.TextField(
        null=True,
    )
    hash = models.TextField(
        null=True,
    )
    firstname = models.TextField(
        null=True,
    )
    lastname = models.TextField(
        null=True,
    )
    is_candidate = models.BooleanField(
        null=True,
    )


class candidate_info(models.Model):
    user_id = models.ForeignKey(
        user,
        to_field="_id",
        on_delete=models.CASCADE,
        unique=True,
        null=True,
    )
    info = models.TextField(
        null=True,
    )
    # more field later :)


class employer_info(models.Model):
    user_id = models.ForeignKey(
        user,
        to_field="_id",
        on_delete=models.CASCADE,
        unique=True,
        null=True,
    )
    company_name = models.TextField(
        null=True,
    )
    # more field later :)


class offer(models.Model):
    title = models.TextField(
        null=True,
    )
    description = models.TextField(
        null=True,
    )
    email = models.TextField(
        null=True,
    )
    phone = models.TextField(
        null=True,
    )
    employer_id = models.ForeignKey(
        employer_info,
        to_field="user_id",
        on_delete=models.CASCADE,
        null=True,
    )


class response(models.Model):
    success = models.BooleanField(default=True)
    data = models.JSONField(null=True, blank=True)
    error = models.JSONField(null=True, blank=True)


def __str__(self):
    return self.title
