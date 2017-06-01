# Create your models here. 建立資料庫（以下是建立3個）

from django.db import models
from django.utils import timezone


class Photo(models.Model):
    title = models.CharField(max_length = 200)
    width = models.IntegerField(default = 0)
    height = models.IntegerField(default = 0)
    image = models.ImageField(null = False, blank = False, width_field = "width", height_field = "height")
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-timestamp"]

