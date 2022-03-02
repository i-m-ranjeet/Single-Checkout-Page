from django.urls import path
from . import views


urlpatterns = [
    path('products', views.products),
    path('add/<int:id>', views.add_to_cart),
    path('all',views.all),
    path('remove/<str:courseid>',views.remove),
    path('delete/<str:courseid>', views.delete),
    path('promos', views.promos),
]