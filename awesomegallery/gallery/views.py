from django.shortcuts import render

from gallery.models import Image

# Create your views here.

def overview(request):
    all_images = Image.objects.all()
    return render(request, 'gallery/overview.html', dict(images=all_images))