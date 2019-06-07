import graphene
from django.contrib.auth.models import User
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from graphql_relay.node.node import from_global_id

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
        id = graphene.GlobalID()
        username = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()

    user = graphene.Field(UserNode)
    status = graphene.Boolean()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **kwargs):
        user_id = int(from_global_id(kwargs['id'])[1])
        if info.context.user.is_superuser or user_id == info.context.user.id:
            user = User.objects.get(pk=user_id)
            create_update_instance(user, kwargs)
            return UpdateUser(user=user, status=True)
        return UpdateUser(status=False)


class Query:
    user = relay.Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)


class Mutation:
    update_user = UpdateUser.Field()
