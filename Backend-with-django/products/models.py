from django.db import models


class Products(models.Model):
    name = models.CharField(max_length=50)
    price_p_m = models.FloatField()

    def __str__(cls):
        return cls.name


class Promotions(models.Model):
    code = models.CharField(max_length=20)
    discount = models.IntegerField()
    minimum_purchase = models.IntegerField()
    description = models.CharField(max_length=120)

    def __str__(cls):
        return cls.code

class Cart(models.Model):
    course_id =  models.CharField(max_length=20)
    quantity = models.IntegerField()

    def __str__(cls):
        return cls.course_id + " " + str(cls.quantity)
