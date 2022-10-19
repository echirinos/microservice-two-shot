from django.http import JsonResponse
from django.shortcuts import render

from common.json import ModelEncoder
from .models import Shoes


class ShoeListEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "url",
        "bin",
    ]


def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder
        )
