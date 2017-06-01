from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import Photo
from django.utils import timezone
# Create your views here.


def photo_list(request):
	queryset = Photo.objects.all()
	context = {"photos":queryset}
	return render(request, "polls/photo_list.html", context)