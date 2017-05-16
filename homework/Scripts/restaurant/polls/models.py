from django.db import models


class Restaurant(models.Model):
	restaurant_name = models.CharField(max_length=200)
	address = models.CharField(max_length=200)

	def __str__(self):
		return self.restaurant_name


class Menu(models.Model):
	restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
	dish_name = models.CharField(max_length=200)
	price = models.IntegerField(default=0)
	population = models.IntegerField(default=0)

	def __str__(self):
		return self.dish_name