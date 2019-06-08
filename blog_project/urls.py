"""blog_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
# from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

from blog_project.base import views as base_views
from blog_project.file_media import views as media_views
from blog_project.post import views as post_views
from .views import reactjs

urlpatterns = [
    path('', base_views.homepage, name='homepage'),

    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('reactjs/', reactjs, name='reactjs'),

    path('login/', auth_views.LoginView.as_view(template_name='base/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('reset/', auth_views.PasswordResetView.as_view(
        template_name='base/password_reset.html',
        email_template_name='base/password_reset_email.html',
        subject_template_name='base/password_reset_subject.txt'
    ), name='password_reset'),
    path('reset/done/', auth_views.PasswordResetDoneView.as_view(
        template_name='base/password_reset_done.html'
    ), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name='base/password_reset_confirm.html'
    ), name='password_reset_confirm'),
    path('reset/complete/', auth_views.PasswordResetCompleteView.as_view(
        template_name='base/password_reset_complete.html'
    ), name='password_reset_complete'),
    path('settings/password/', auth_views.PasswordChangeView.as_view(
        template_name='base/password_change.html'
    ), name='password_change'),
    path('settings/password/done/', auth_views.PasswordChangeDoneView.as_view(
        template_name='base/password_change_done.html'
    ), name='password_change_done'),

    # path('admin/', admin.site.urls),
    path('admin/', include('blog_project.blog_admin.urls')),
    path('categories/', post_views.CategoryListView.as_view(), name='category_index'),

    path('ajax/media/', media_views.ajax_media_index, name='ajax_media_index'),

    path('i18n/', include('django.conf.urls.i18n')),
    # path('summernote/', include('django_summernote.urls')),
]

if settings.DEBUG:
    import debug_toolbar
    from django.conf.urls.static import static

    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
