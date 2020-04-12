from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.utils.translation import gettext_lazy as _
from django.views.decorators.http import require_POST

from blog_project.file_media.models import FileMedia
from blog_project.post.models import Category, Post
from blog_project.tools import range_pagination
from . import forms


# Create your views here.
@login_required
def react_view(request, *args, **kwargs):
    return render(request, 'build/index.html')


def index(request):
    return redirect('admin_dashboard')


@login_required
def dashboard(request):
    return render(request, 'admin/dashboard.html')


@login_required
def category_index(request):
    is_update = False
    if 'update' in request.GET:
        pk = int(request.GET['update'])
        category = Category.objects.get(pk=pk)
        form = forms.CategoryForm(instance=category)
        form_action = reverse('admin_category_update', kwargs={'pk': pk})
        is_update = True
    else:
        form = forms.CategoryForm()
        form_action = reverse('admin_category_create')
    categories = Category.objects.all()
    context = {
        'categories': categories,
        'form': form,
        'form_action': form_action,
        'is_update': is_update,
    }
    return render(request, 'admin/category/index.html', context=context)


@require_POST
@login_required
def category_create(request):
    form = forms.CategoryForm(request.POST)
    if form.is_valid():
        category = form.save(commit=False)
        category.created_by = request.user
        category.save()
        if request.is_ajax():
            messages.success(request, _("Successfully created a new category."))
            return JsonResponse({
                'success': True,
                'redirect': reverse('admin_category_index')
            })
    else:
        if request.is_ajax():
            return JsonResponse(form.errors)
        messages.warning(request,
                         _("There is a problem when you create a new category! Please contact an administrator!"))
    return redirect('admin_category_index')


@require_POST
@login_required
def category_update(request, pk):
    category = Category.objects.get(pk=pk)
    form = forms.CategoryForm(request.POST, instance=category)
    if form.is_valid():
        form.save()
        if request.is_ajax():
            messages.success(request, _("Category has been updated."))
            return JsonResponse({
                'success': True,
                'redirect': reverse('admin_category_index')
            })
    else:
        if request.is_ajax():
            return JsonResponse(form.errors)
        messages.warning(request, _("There is a problem when you update a category! Please contact an administrator!"))
    return redirect('admin_category_index')


@login_required
def category_delete(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if category.posts.count() > 0:
        messages.warning(request, _("You cannot delete a category that has a post."))
    else:
        category.delete()
        messages.success(request, _("Successfully deleted a new category."))
    return redirect('admin_category_index')


@login_required
def post_index(request):
    post_list = Post.objects.all()
    paginator = Paginator(post_list, 10)
    page = request.GET.get('page', '1')
    posts = paginator.get_page(page)
    num_pages = posts.paginator.num_pages
    pagination = range_pagination(int(page), num_pages, limit=10)

    context = {
        'posts': posts,
        'pagination': pagination,
    }
    return render(request, 'admin/post/index.html', context=context)


@login_required
def post_create(request):
    if request.method == 'POST':
        form = forms.PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.created_by = request.user
            post.save()
            if request.is_ajax():
                return JsonResponse({
                    'success': True,
                    'id': post.id,
                })
            return redirect('admin_post_create')
        else:
            if request.is_ajax():
                return JsonResponse(form.errors)
    else:
        form = forms.PostForm()

    media_form = forms.FileMediaCreateForm()
    context = {
        'form': form,
        'media_form': media_form
    }
    return render(request, 'admin/post/create.html', context=context)


@login_required
def post_update(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        form = forms.PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            if request.is_ajax():
                return JsonResponse({
                    'success': True,
                    'id': post.id,
                })
            return redirect('admin_post_create')
    else:
        form = forms.PostForm(instance=post)

    media_form = forms.FileMediaCreateForm()
    context = {
        'form': form,
        'media_form': media_form
    }
    return render(request, 'admin/post/create.html', context=context)


@login_required
def file_media_create(request):
    if request.method == 'POST':
        form = forms.FileMediaCreateForm(request.POST, request.FILES)
        if form.is_valid():
            media = form.save(commit=False)
            media.created_by = request.user
            media.save()
            messages.success(request, _("Successfully upload a new media."))
            if request.is_ajax():
                return JsonResponse({
                    'success': True,
                    'redirect': reverse('admin_file_media_create'),
                    'media': {
                        'url': media.media.url,
                        'alt': media.alt,
                    }
                })
            return redirect('admin_file_media_index')
        else:
            if request.is_ajax():
                return JsonResponse(form.errors)
    else:
        form = forms.FileMediaCreateForm()
    context = {'form': form}

    if request.is_ajax():
        return render(request, 'admin/file_media/_form.html', context=context)
    return render(request, 'admin/file_media/create.html', context=context)


@login_required
def file_media_index(request):
    file_list = FileMedia.objects.all()
    paginator = Paginator(file_list, 10)
    page = request.GET.get('page', '1')
    files = paginator.get_page(page)

    num_pages = files.paginator.num_pages
    pagination = range_pagination(int(page), num_pages, limit=10)

    context = {
        'files': files,
        'pagination': pagination,
    }
    return render(request, 'admin/file_media/index.html', context=context)


@login_required
def file_media_update(request, pk):
    file = get_object_or_404(FileMedia, pk=pk)
    if request.method == 'POST':
        form = forms.FileMediaUpdateForm(request.POST, instance=file)
        if form.is_valid():
            form.save()
            messages.success(request, _("Successfully update your media."))
            return redirect('admin_file_media_index')
    else:
        form = forms.FileMediaUpdateForm(instance=file)
    context = {
        'file': file,
        'form': form,
    }
    return render(request, 'admin/file_media/update.html', context=context)
