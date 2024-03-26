from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'phone', 'password', 'dob', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data.get('email')
        user = User.objects.filter(email=email).first()  # Check if user already exists

        if user:
            raise serializers.ValidationError('Email is already existed.')

        user = User.objects.create(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            try:
                user = User.objects.get(email=email,password=password)
                if not user:
                    raise AuthenticationFailed('Invalid password.')
            except User.DoesNotExist:
                raise AuthenticationFailed('User not found.')
        else:
            raise serializers.ValidationError('Must include "email" and "password".')
        
        return user 