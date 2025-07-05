from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "categories"

class Resource(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ProgressLog(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=[
            ('STARTED', 'Started'),
            ('IN_PROGRESS', 'In Progress'),
            ('COMPLETED', 'Completed')
        ]
    )
    notes = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.resource.title} - {self.status}"