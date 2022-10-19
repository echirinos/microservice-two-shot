from django.db import models

# Create your models here.

class Hat(models.Model):
    fabric = models.CharField(max_length=30)
    style_name= models.CharField(max_length=30)
    color = models.CharField(max_length=30)
    picture_url = models.URLField(null=True)
    wardrobe_location = models.PositiveSmallIntegerField()