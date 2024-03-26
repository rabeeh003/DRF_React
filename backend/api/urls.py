from django.urls import path
from user.views import UserListCreateAPIView, RegisterAPIView, LoginAPIView

urlpatterns = [
    path('users/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('signup/', RegisterAPIView.as_view(), name='signup'),
    path('login/', LoginAPIView.as_view(), name='login'),
]