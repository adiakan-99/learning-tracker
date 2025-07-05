from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from .models import Category, Resource, ProgressLog
from .serializers import CategorySerializer, ResourceSerializer, ProgressLogSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_complete(self, request, pk=None):
        resource = self.get_object()
        ProgressLog.objects.create(resource=resource, status='COMPLETED', notes='Completed via API')
        return Response({'status': 'marked as completed'})

    @action(detail=False, methods=['get'])
    def summary(self, request):
        user = request.user
        total_resources = Resource.objects.filter(user=user).count()
        completed = ProgressLog.objects.filter(resource__user=user, status='COMPLETED').count()
        return Response({
            'total_resources': total_resources,
            'completed_resources': completed,
        })

class ProgressLogViewSet(viewsets.ModelViewSet):
    queryset = ProgressLog.objects.all()
    serializer_class = ProgressLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(resource__user=self.request.user)