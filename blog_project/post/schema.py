import graphene
from django.contrib.auth.models import User
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import from_global_id

from blog_project.tools import create_update_instance
from .models import Category, Post


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        filter_fields = {
            'id': ['exact'],
            'name': ['exact', 'icontains', 'istartswith'],
            'description': ['exact', 'icontains'],
            'parent': ['exact'],
            'parent__name': ['exact', 'icontains', 'istartswith'],
            'language': ['exact'],
            'created_by': ['exact'],
            'created_by__username': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (relay.Node,)


class CreateCategory(relay.ClientIDMutation):
    class Input:
        name = graphene.String(required=True)
        description = graphene.String()
        slug = graphene.String(required=True)
        parent = graphene.String()
        language = graphene.String()
        created_by = graphene.String(required=True)

    category = graphene.Field(CategoryNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        parent = None
        if 'parent' in kwargs:
            parent_id = int(from_global_id(kwargs['parent'])[1])
            parent = Category.objects.get(pk=parent_id)
        user_id = int(from_global_id(kwargs.get('created_by'))[1])
        user = User.objects.get(pk=user_id)

        category = Category(parent=parent, created_by=user)
        create_update_instance(category, kwargs, exclude=['parent', 'created_by'])
        return CreateCategory(category=category)


class PostNode(DjangoObjectType):
    class Meta:
        model = Post
        filter_fields = {
            'id': ['exact'],
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


class Mutation:
    create_category = CreateCategory.Field()
