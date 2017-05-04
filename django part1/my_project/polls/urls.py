from django.conf.urls import url

from . import views

#出現網址的地方
urlpatterns = [
    url(r'^$', views.index, name='index'),   
]