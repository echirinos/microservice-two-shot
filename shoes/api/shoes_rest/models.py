from django.db import models

class ShoesVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)

class Shoes(models.Model):
    name = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null = True)

    def __str__(self):
        return self.name
