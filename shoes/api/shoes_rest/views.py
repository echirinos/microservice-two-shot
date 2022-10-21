from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder

from .models import Shoe, BinVO

# Create your views here.

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "id",
        "closet_name",
        "bin_number",
        "bin_size",
    ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "name",
        "color",
        "picture_url",
        "bin",
    ]
    encoders = {
        "bin": BinVOEncoder()
    }

@require_http_methods(["GET"])
def list_bin_vos(request):
    bin = BinVO.objects.all()
    return JsonResponse(
    {"bins": bin},
    encoder=BinVOEncoder,
)

@require_http_methods(["GET", "POST"])
def list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            bin = BinVO.objects.get(id=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def show_shoe(request, pk):
    if request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
