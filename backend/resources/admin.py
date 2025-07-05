from django.contrib import admin
from .models import Category, Resource, ProgressLog

admin.site.register(Category)
admin.site.register(Resource)
admin.site.register(ProgressLog)