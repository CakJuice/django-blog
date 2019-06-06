import graphene
from django.contrib.auth.models import User
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from blog_project.tools import create_update_instance


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = {
            'username': ['exact', 'icontains', 'istartswith'],
            'email': ['exact', 'icontains', 'istartswith'],
            'is_superuser': ['exact'],
            'is_staff': ['exact'],
            'is_active': ['exact'],
        }
        interfaces = (relay.Node,)


class UpdateUser(relay.ClientIDMutation):
    class Input:
        id = graphene.ID()
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()

    user = graphene.Field(UserNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        user = User.objects.get(pk=1)
        create_update_instance(user, kwargs)
        return UpdateUser(user=user)


class Query:
    user = relay.Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)


class Mutation:
    update_user = UpdateUser.Field()
