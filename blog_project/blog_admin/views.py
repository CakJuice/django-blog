from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.utils.translation import gettext_lazy as _
from django.views.decorators.http import require_POST

from blog_project.post.models import Category
from . import forms


# Create your views here.
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
def post_create(request):
    if request.method == 'POST':
        form = forms.PostForm(request.POST)
    else:
        form = forms.PostForm()
    context = {
        'form': form
    }
    return render(request, 'admin/post/create.html', context=context)
