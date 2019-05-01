from django.views.generic.list import ListView

from .models import Category


# Create your views here.
class CategoryListView(ListView):
    model = Category
    paginate_by = 20
    template_name = 'category/index.html'
