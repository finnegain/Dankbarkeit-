from django.urls import path

from . import views

urlpatterns = [
    path('', views.overview, name='overview'),
    path('text/upload/', views.upload_text, name='upload_text'),
    path('text/like/<int:pk>/', views.like_message, name='like_message'),
]