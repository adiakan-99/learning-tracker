from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ResourceViewSet, ProgressLogViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'progress-logs', ProgressLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]