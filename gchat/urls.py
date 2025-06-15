from django.urls import path

from . import views

urlpatterns = [
    path("", views.main),
    path("prompt", views.get_prompt),
    path("generate", views.generate),
]