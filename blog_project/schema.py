import graphene

from blog_project.base import schema as base_schema


class Query(base_schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
