from django.forms import ModelForm

from blog_project.post.models import Category


class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'description', 'slug', 'parent', 'language']
