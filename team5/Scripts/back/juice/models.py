from django.db import models


class Member(models.Model):
	Member_account = models.CharField(max_length=200)
	Member_name = models.CharField(max_length=200)
	Member_email = models.CharField(max_length=200)
	Member_password = models.CharField(max_length=200)
	Member_phone = models.CharField(max_length=200)
	Member_address = models.CharField(max_length=200)

	def __str__(self):
		return self.Member_name

class List(models.Model):
	customer = models.IntegerField(default = 0)
	List_content1 = models.CharField(max_length=200)
	List_content2 = models.CharField(max_length=200)
	List_content3 = models.CharField(max_length=200, default = "")
	price = models.IntegerField(default = 0)
	number = models.IntegerField(default=0)


	def __str__(self):
		return self.List_content1 + self.List_content2 + self.List_content3 + "汁"