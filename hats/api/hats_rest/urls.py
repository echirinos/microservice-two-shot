from django.contrib import admin
from django.urls import path, include
from .views import list_hats, show_hats, list_location_vos


urlpatterns = [
    # path('admin/', admin.site.urls),
    path('hats/', list_hats, name='list_hats'),
    path('hats/<int:pk>/', show_hats, name='show_hat'),
    path('locations/', list_location_vos, name='list_location_vos'),
]   
