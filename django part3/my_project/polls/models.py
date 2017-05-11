# Create your models here. 建立資料庫（以下是建立3個）

from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200) #裡面的內容和格式（文字和日期）
    pub_date = models.DateTimeField('date published') 

    def __str__(self):   #加入這些可以變名字
        return self.question_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0) #格式（數值）

    def __str__(self):
        return self.choice_text

class Student(models.Model):
	student_name = models.CharField(max_length=200)
	student_id = models.CharField(max_length=200)
	student_hobby = models.CharField(max_length=200)
	student_birthday = models.DateTimeField('date published')

	def __str__(self):   #加入這些可以變名字
		return self.student_id + "  " + self.student_name + "  "