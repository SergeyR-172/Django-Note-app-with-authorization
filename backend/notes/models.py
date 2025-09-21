from django.db import models
from authentication.models import CustomUser


class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    favourite = models.BooleanField(default=False)
    category = models.CharField(max_length=15)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title