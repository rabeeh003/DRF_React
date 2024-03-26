from django.db import models
# from django.contrib.auth.models import AbstractUser

# class User(AbstractUser):
#     name = models.CharField(max_length=254)
#     email = models.EmailField(max_length=254, unique=True)
#     phone = models.CharField(max_length=15)  # Adjust length based on your requirements
#     dob = models.DateField()
#     profile = models.ImageField(upload_to='shop/profile', default="not_found")

#     username = None

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name', 'dob']


class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=10)
    password = models.CharField(max_length=15)
    dob = models.DateField(auto_now=False, auto_now_add=False)
    profile = models.ImageField( upload_to='shop/profile', height_field=None, width_field=None, max_length=None, default="not found")
    