# Create your models here. 建立資料庫（以下是建立3個）

from django.db import models
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length = 200)
    text = models.TextField()
    create_date = models.DateTimeField(default = timezone.now)
    published_date = models.DateTimeField(blank = True, null = True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title




class Photo(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default = 0)
    title = models.CharField(max_length = 200)
    width = models.IntegerField(default = 0)
    height = models.IntegerField(default = 0)
    image = models.ImageField(null = False, blank = False, width_field = "width", height_field = "height")
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-timestamp"]

