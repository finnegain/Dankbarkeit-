from django.urls import path

from . import views

urlpatterns = [
    path('', views.overview, name='overview'),
    path('upload', views.upload, name='upload'),
    path('text/upload/', views.upload_text, name='upload_text'),
    path('text/overview/', views.text_overview, name='text_overview'), #text overview durch overview ersetzt
    path('text/like/<int:pk>/', views.like_message, name='like_message'),
]