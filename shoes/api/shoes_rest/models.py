from django.db import models

class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)


class Shoes(models.Model):
    manufacturer = models.CharField(max_length=150)
    model_name = models.CharField(max_length=150)
    color = models.CharField(max_length=150)
    url = models.URLField(max_length=300)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoe",
        on_delete=models.CASCADE
    )
