from django.contrib import admin

# Register your models here.

from .models import TextMessage

admin.site.register(TextMessage)