from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from . import models


@csrf_exempt
def products(request):
    if request.method == 'GET':
        all_products = models.Products.objects.all()
        get_all = []
        for item in all_products:
            get_all.append({"id":item.id, "name": item.name, "price_p_m":item.price_p_m})
        return JsonResponse(data={"data":get_all})

@csrf_exempt
def add_to_cart(request, id=None):
    find_name = models.Products.objects.get(id=id).name
    try:
        product = models.Cart.objects.get(course_id=find_name)
        product.course_id = find_name
        product.quantity =product.quantity+1
        product.save()
        all = models.Cart.objects.all()
        data = {}
        for product in all:
            data.update({product.course_id:product.quantity})
        return JsonResponse(data=data)
    except models.Cart.DoesNotExist:
        new = models.Cart.objects.create(course_id=find_name,quantity=1)
        all = models.Cart.objects.all()
        data = {}
        for product in all:
            data.update({product.course_id:product.quantity})
        return JsonResponse(data=data)

def all(request):
    all = models.Cart.objects.all()
    data = {}
    for product in all:
        data.update({product.course_id:product.quantity})
    return JsonResponse(data=data)

def delete(request, courseid = None):
    get_item = models.Cart.objects.get(course_id = courseid)
    get_item.delete()

    all = models.Cart.objects.all()
    data = {}
    for product in all:
        data.update({product.course_id:product.quantity})
    return JsonResponse(data=data)

def remove(request, courseid=None):
    get_item = models.Cart.objects.get(course_id = courseid)
    if get_item.quantity >1:
        get_item.quantity -=1
        get_item.save()
    else:
        get_item.delete()
        
    all = models.Cart.objects.all()
    data = {}
    for product in all:
        data.update({product.course_id:product.quantity})
    return JsonResponse(data=data)




def promos(request):
    all = models.Promotions.objects.all()
    data = []
    for promo in all:
        data.append({"code":promo.code, "discount":promo.discount, "description": promo.description, "minimum_purchase": promo.minimum_purchase})
    return JsonResponse(data={"data":data})
