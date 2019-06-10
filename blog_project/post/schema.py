import graphene
from django.contrib.auth.models import User
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import from_global_id
# from graphql_jwt.decorators import login_required
from django.contrib.auth.decorators import login_required

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

    category = graphene.Field(CategoryNode)
    status = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **kwargs):
        parent = None
        if 'parent' in kwargs:
            parent_id = int(from_global_id(kwargs['parent'])[1])
            parent = Category.objects.get(pk=parent_id)

        category = Category(parent=parent, created_by=info.context.user)
        create_update_instance(category, kwargs, exclude=['parent', 'created_by'])
        return CreateCategory(category=category, status=True)


class UpdateCategory(relay.ClientIDMutation):
    class Input:
        id = graphene.GlobalID()
        name = graphene.String(required=True)
        description = graphene.String()
        slug = graphene.String(required=True)
        parent = graphene.String()
        language = graphene.String()

    category = graphene.Field(CategoryNode)
    status = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **kwargs):
        category_id = int(from_global_id(kwargs['id'])[1])
        category = Category.objects.get(pk=category_id)
        if not category:
            return UpdateCategory(status=False)

        create_update_instance(category, kwargs, exclude=['id', 'parent'])
        if 'parent' in kwargs:
            parent_id = int(from_global_id(kwargs['parent'])[1])
            parent = Category.objects.get(pk=parent_id)
            category.parent = parent

        category.save()
        return UpdateCategory(category=category, status=True)


class DeleteCategory(relay.ClientIDMutation):
    class Input:
        id = graphene.GlobalID()

    status = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **kwargs):
        category_id = int(from_global_id(kwargs['id'])[1])
        category = Category.objects.get(pk=category_id)
        if not category:
            return DeleteCategory(status=False)
        category.delete()
        return DeleteCategory(status=True)


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
    update_category = UpdateCategory.Field()
    delete_category = DeleteCategory.Field()
