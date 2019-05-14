from django.forms import ModelForm

from blog_project.file_media.models import FileMedia
from blog_project.post.models import Category, Post


class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'description', 'slug', 'parent', 'language']


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'description', 'slug', 'category', 'body', 'body_preview', 'language']


class FileMediaCreateForm(ModelForm):
    class Meta:
        model = FileMedia
        fields = ['name', 'media']


class FileMediaUpdateForm(ModelForm):
    class Meta:
        model = FileMedia
        fields = ['name', 'alt', 'description']
