from django.db import models
from django.urls import reverse



# Create your models here.
class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True, blank=True)
    location = models.ForeignKey('LocationVO', related_name="hats", on_delete=models.CASCADE)

    def __str__(self):
        return self.style_name
    
    class Meta:
        ordering = ['location', 'style_name']
        verbose_name = 'Hat'
        verbose_name_plural = 'Hats'

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_location", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.closet_name} - {self.section_number}/{self.shelf_number}"

    class Meta:
        ordering = ["closet_name", "section_number", "shelf_number"]
        verbose_name = "Location"
        verbose_name_plural = "Locations"

