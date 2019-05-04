from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='admin_index'),
    path('dashboard/', views.dashboard, name='admin_dashboard'),

    path('categories/', views.category_index, name='admin_category_index'),
    path('category/create/', views.category_create, name='admin_category_create'),
    path('category/<int:pk>/update/', views.category_update, name='admin_category_update'),
]
