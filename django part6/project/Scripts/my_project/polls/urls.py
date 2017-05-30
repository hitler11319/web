from django.conf.urls import url

from . import views

#出現網址的地方，現在有四個頁面網址
app_name = 'polls'   #這是Namespacing URL names（讓後面方便用的）
urlpatterns = [
    url(r'^$', views.index, name='index'), 
    # ex: /1/  
    url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /1/results/   頁面
    url(r'^(?P<question_id>[0-9]+)/results/$', views.results, name='results'),
    # ex: /1/vote/   頁面
    url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
]

# ^表示開始
# $表示結束
# +表示前面的元素至少重複一次
# ()表示某一部份模式
# ?表示匹配某一部份模式