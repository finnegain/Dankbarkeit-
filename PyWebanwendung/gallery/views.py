from django import forms
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from gallery.models import Image

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        exclude = []

# Create your views here.

def overview(request):
    all_images = Image.objects.all()
    return render(request, 'gallery/overview.html', dict(images=all_images))

@login_required
def upload(request):
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = ImageForm()
    form = ImageForm()
    return render(request, 'gallery/upload.html', dict(form=form))