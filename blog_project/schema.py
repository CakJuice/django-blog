import graphene
import graphql_jwt

from blog_project.base import schema as base_schema
from blog_project.post import schema as post_schema


class Query(base_schema.Query, post_schema.Query, graphene.ObjectType):
    pass


class Mutation(base_schema.Mutation, post_schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
