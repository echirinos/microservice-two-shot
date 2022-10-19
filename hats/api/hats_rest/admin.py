from django.contrib import admin

# Register your models here.
from .models import Hat


@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
    pass
