from rest_framework import serializers
from .models import Category, Resource, ProgressLog

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at']

class ResourceSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Resource
        fields = ['id', 'user', 'category', 'category_id', 'title', 'url', 'description', 'created_at']
        read_only_fields = ['user', 'created_at']

class ProgressLogSerializer(serializers.ModelSerializer):
    resource = ResourceSerializer(read_only=True)
    resource_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = ProgressLog
        fields = ['id', 'resource', 'resource_id', 'status', 'notes', 'updated_at']
        read_only_fields = ['updated_at']