from django import forms
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse

from main.models import TextMessage

class TextMessageForm(forms.ModelForm):
    class Meta:
        model = TextMessage
        fields = ['text']

def overview(request):
    newest_messages = TextMessage.objects.all().order_by('-created_at')[:10]

    context = {
        'messages': newest_messages
    }
    return render(request, 'main/overview.html', context)

def archive(request):
    older_messages = TextMessage.objects.all().order_by('-created_at')[10:]

    context = {
        'messages': older_messages
    }
    return render(request, 'main/archive.html', context)

def about(request):
    return render(request, 'main/about.html')

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

    return render(request, 'main/upload_text.html', dict(form=form))

@login_required
def like_message(request, pk):
    message = get_object_or_404(TextMessage, pk=pk)

    if message.likes.filter(id=request.user.id).exists():
        message.likes.remove(request.user)
    else:
        message.likes.add(request.user)

    return redirect('overview')