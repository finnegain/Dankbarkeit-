from django import forms
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse

from gallery.models import Image, TextMessage

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        exclude = []

# Create your views here.

def overview(request):
    all_images = Image.objects.all()
    all_messages = TextMessage.objects.all().order_by('-created_at')
    return render(request, 'gallery/overview.html', dict(images=all_images, messages=all_messages))

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

#Textnachrichten
class TextMessageForm(forms.ModelForm):
    class Meta:
        model = TextMessage
        fields = ['text']


@login_required
def upload_text(request):
    if request.method == 'POST':
        form = TextMessageForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.author = request.user
            message.save()
            return redirect('overview')
    else:
        form = TextMessageForm()

    return render(request, 'gallery/upload_text.html', dict(form=form))


def text_overview(request):
    all_messages = TextMessage.objects.all().order_by('-created_at')
    return render(request, 'gallery/text_overview.html', dict(messages=all_messages))


@login_required
def like_message(request, pk):
    message = get_object_or_404(TextMessage, pk=pk)

    if message.likes.filter(id=request.user.id).exists():
        message.likes.remove(request.user)
    else:
        message.likes.add(request.user)

    return redirect('overview')