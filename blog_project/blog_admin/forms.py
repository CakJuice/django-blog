from django.forms import ModelForm

from blog_project.blog_media.models import ImageMedia
from blog_project.post.models import Category, Post


class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'description', 'slug', 'parent', 'language']


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'description', 'slug', 'category', 'body', 'body_preview', 'language']


class ImageMediaCreateForm(ModelForm):
    class Meta:
        model = ImageMedia
        fields = ['name', 'image']
