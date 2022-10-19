# Wardrobify

*** TIP: If on MAC hit CMD + SHIFT + V, to see README.MD clearly

Team:

* Tanner - Hat
* Person 2 - Which microservice?

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.



## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.

The Hat resource should track its::

fabric
style name
color 
URL for a picture 
location in the wardrobe where it exists.

class Hat(models.Model):
    fabric = models.CharField(max_length=30)
    style_name= models.CharField(max_length=30)
    color = models.CharField(max_length=30)
    picture_url = models.URLField(null=True)
    wardrobe_location = models.PositiveSmallIntegerField()


    API_VIEWS

@require_http_methods(["GET"])
def api_list_hats(request):
    hats = Hats.objects.order_by("wardrobe_location")
    # Create an empty list named hats_list
    hats_list = []

    # For each hat in the hats from the database
    for hat in hats:
        # Create a dictionary that contains the name and
        # abbreviation for each state
        hats_dict = {}
        hats_dict["wardrobe_location"] = wardrobe_location.name
        state_dict["abbreviation"] = state.abbreviation

        # Append the dictionary to the list
        state_list.append(state_dict)

    return JsonResponse({"states": state_list})