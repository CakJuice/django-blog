from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='admin_index'),
    path('dashboard/', views.dashboard, name='admin_dashboard'),

    path('categories/', views.category_index, name='admin_category_index'),
    path('category/create/', views.category_create, name='admin_category_create'),
    path('category/<int:pk>/update/', views.category_update, name='admin_category_update'),
    path('category/<int:pk>/delete/', views.category_delete, name='admin_category_delete'),

    path('post/create/', views.post_create, name='admin_post_create'),

    path('image-media/create/', views.image_media_create, name='image_media_create'),
]
