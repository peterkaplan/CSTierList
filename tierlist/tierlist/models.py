from django.db import models

class Company(models.Model):
	name = models.CharField(max_length=50)
	size = models.IntegerField()
	logo = models.CharField(max_length=50)
	link = models.CharField(max_length=50)
	description = models.CharField(max_length=500)
	count = models.IntegerField()

class Location(models.Model):
	name = models.CharField(max_length=50)

class Office(models.Model):
	lid = models.ForeignKey(Location, on_delete=models.CASCADE, verbose_name="location id")
	cid = models.ForeignKey(Company, on_delete=models.CASCADE, verbose_name="company id")

class Profile(models.Model):
	ip = models.CharField(max_length=39)

class Vote(models.Model):
	pid = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name="profile id")
	cid = models.ForeignKey(Company, on_delete=models.CASCADE, verbose_name="profile id")
	date = models.DateTimeField(auto_now_add=True)

