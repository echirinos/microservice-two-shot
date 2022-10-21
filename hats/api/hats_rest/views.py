from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import LocationVO, Hat
from common.json import ModelEncoder


# Create your views here.

class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["id", "closet_name", "section_number", "shelf_number"]

class HatEncoder(ModelEncoder):
    model = Hat
    properties = ["id", "fabric", "style_name", "color", "picture_url", "location"]
    encoders = {
        "location": LocationVOEncoder()
    }


def list_location_vos(request):
    location = LocationVO.objects.all()
    return JsonResponse(
    {"locations": location},
    encoder=LocationVOEncoder,
)


@require_http_methods(["GET", "POST"])
def list_hats(request):
    """
    Collection RESTful API handler for Hat objects in
    the wardrobe.
    """
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse (
            {"hats": hats},
            encoder=HatEncoder,
            safe=False,
            )
    if request.method == "POST":
        content = json.loads(request.body)
        try:
            if "location" in content:
                location_id = content["location"]
                location = LocationVO.objects.get(id=location_id)
                content["location"] = location
            else:
                content["location"] = None
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"Message": "Invalid location"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def show_hats(request, pk):
    """
    Item RESTful API handler for Hat objects in
    the wardrobe.
    """
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatEncoder,
            safe=False,
        )
    if request.method == "PUT":
        content = json.loads(request.body)
        try:
            if "location" in content:
                location_id = content["location"]
                location = LocationVO.objects.get(id=location_id)
                content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"Message": "Invalid location"},
                status=400,
            )
        Hat.objects.filter(id=pk).update(**content)
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatEncoder,
            safe=False,
        )
    if request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse(
            {"Deleted": count > 0},
            status=204,
        )
