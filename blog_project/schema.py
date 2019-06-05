import graphene

from blog_project.base import schema as base_schema
from blog_project.post import schema as post_schema


class Query(base_schema.Query, post_schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
