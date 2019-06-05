from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from .models import Category, Post


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'description': ['exact', 'icontains'],
            'parent': ['exact'],
            'parent__name': ['exact', 'icontains', 'istartswith'],
            'language': ['exact']
        }
        interfaces = (relay.Node,)


class PostNode(DjangoObjectType):
    class Meta:
        model = Post
        filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
            'description': ['exact', 'icontains'],
            'category': ['exact'],
            'category__name': ['exact', 'icontains', 'istartswith'],
            'body': ['icontains'],
        }
        interfaces = (relay.Node,)


class Query:
    category = relay.Node.Field(CategoryNode)
    all_categories = DjangoFilterConnectionField(CategoryNode)

    post = relay.Node.Field(PostNode)
    all_posts = DjangoFilterConnectionField(PostNode)
