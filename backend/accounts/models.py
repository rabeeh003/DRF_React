from django.db import models
from django.contrib.auth.models import User

class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_detail')
    dob = models.DateField()
    profile = models.ImageField(upload_to='shop/profile')
    phone = models.CharField(max_length=15)

    
    
