from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView

from blog_project.post.models import Category
from blog_project.mixin import UserCreatorMixin


# Create your views here.
def index(request):
    return redirect('admin_dashboard')


@login_required
def dashboard(request):
    return render(request, 'admin/dashboard.html')


class CategoryCreateView(UserCreatorMixin, CreateView):
    model = Category
    template_name = 'admin/category/create.html'
    fields = ['name', 'description', 'slug', 'parent']

    def get_success_url(self):
        return redirect('admin_category_create')
