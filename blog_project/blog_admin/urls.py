from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='admin_index'),
    path('dashboard/', views.dashboard, name='admin_dashboard'),
]
