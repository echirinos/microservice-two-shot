from django.shortcuts import render
from .models import Hat
# Create your views here.
from common.json import ModelEncoder
from django.http import JsonResponse
import json

class LocationListEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric", "picture_url", "style_name", "wardrobe_location"]

def api_list_locations(request):
    # Get the states from the database ordered by name
    hats = Hat.objects.order_by('name')

    # Create an empty list named state_list
    hat_list = []

    # For each state in the states from the database
    for hat in hats:
        # Create a dictionary that contains the name and
        # abbreviation for each state
        hat_dict = {}
        hat_dict["fabric"] = hat.fabric
        hat_dict["style_name"] = hat.style_name
        hat_dict["color"] = hat.color
        hat_dict["wardrobe_location"]= hat.wardrobe_location

        # Append the dictionary to the list
        hat_list.append(hat_dict)

    return JsonResponse({"hats": hat_list})