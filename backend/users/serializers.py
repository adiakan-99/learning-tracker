from django.contrib.auth.models import User
from rest_framework import serializers

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    re_password = serializers.CharField(write_only=True)  # Changed from password_confirmation

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 're_password']  # Updated field

    def validate(self, data):
        if data['password'] != data['re_password']:  # Updated field
            raise serializers.ValidationError("Passwords must match")
        return data

    def create(self, validated_data):
        validated_data.pop('re_password')  # Updated field
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']