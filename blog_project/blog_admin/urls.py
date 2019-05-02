from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='admin_index'),
    path('dashboard/', views.dashboard, name='admin_dashboard'),

    path('category/create/', views.CategoryCreateView.as_view(), name='admin_category_create'),
]
