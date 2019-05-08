from django.forms import ModelForm
# from django_summernote.widgets import SummernoteInplaceWidget

from blog_project.post.models import Category, Post


class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'description', 'slug', 'parent', 'language']


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'description', 'slug', 'category', 'body', 'body_preview', 'language']
        # widgets = {
        #     'body': SummernoteInplaceWidget(),
        # }
