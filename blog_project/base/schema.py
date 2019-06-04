from django.contrib.auth.models import User
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType


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


class Query:
    user = relay.Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)
