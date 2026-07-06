from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=200)

class TextMessage(models.Model):
    text = models.TextField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='text_messages')
    likes = models.ManyToManyField(User, related_name='liked_messages', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.text[:50]