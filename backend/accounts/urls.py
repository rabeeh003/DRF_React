from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import *

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('register/', CreateUserAPIView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('update/', UpdateUserAPIView.as_view(), name='update'),
    path('home/', Home.as_view(), name='home'),
]