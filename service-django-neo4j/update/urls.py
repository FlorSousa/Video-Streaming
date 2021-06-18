from django.urls import path
from . import views

#subrotas
urlpatterns = [ 
    path('', views.index)
]