from django.conf.urls import url

from . import views

app_name = 'juice'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^/add_member/$', views.add_member, name='add_member'),
    url(r'^/single/$', views.single, name='single'),
    url(r'^/blog/$', views.blog, name='blog'),
    url(r'^/about/$', views.about, name='about'),
    url(r'^/contact/$', views.contact, name='contact'),
    url(r'^/gallery/$', views.gallery, name='gallery'),
    url(r'^/icons/$', views.icons, name='icons'),
    url(r'^/membership/$', views.membership, name='membership'),
    url(r'^/order/$', views.order, name='order'),
    url(r'^/slot/$', views.slot, name='slot'),
    url(r'^/test/$', views.test, name='test'),
    url(r'^/typography/$', views.typography, name='typography'),                
    url(r'^/registered/$', views.registered, name='registered'),
    url(r'^/login_check/$', views.login_check, name='login_check'),
    url(r'^/login_out/$', views.login_out, name='login_out'),
    url(r'^/add_list/$', views.add_list, name='add_list'),
    url(r'^/delete_list/$', views.delete_list, name='delete_list'),
    url(r'^/bouns/$', views.bouns, name='bouns'),
    url(r'^/mail/$', views.mail, name='mail'),
]