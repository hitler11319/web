from django.conf.urls import url

from . import views

#出現網址的地方，現在有四個頁面網址
app_name = 'polls'   #這是Namespacing URL names（讓後面方便用的）
urlpatterns = [
    url(r'^$', views.photo_list, name='photo_list'),  
]

# ^表示開始
# $表示結束
# +表示前面的元素至少重複一次
# ()表示某一部份模式
# ?表示匹配某一部份模式