from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify
from django.utils.crypto import get_random_string


# Create your models here.
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, related_name='+',
                                   verbose_name="Created By")

    class Meta:
        abstract = True


class Category(BaseModel):
    name = models.CharField(max_length=60, verbose_name="Name")
    description = models.CharField(max_length=158, verbose_name="Description", blank=True)
    slug = models.CharField(max_length=64, unique=True, db_index=True, verbose_name="Slug", blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='childs',
                               verbose_name="Parent")

    class Meta:
        db_table = settings.DB_TABLE_PREFIX + 'category'
        ordering = ['name']

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if force_insert:
            if not self.description:
                self.description = self.name
            if not self.slug:
                self.slug = slugify(self.title)
        super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)


class Post(BaseModel):
    STATE = (
        (0, 'Draft'),
        (1, 'Published'),
        (9, 'Archived'),
    )

    title = models.CharField(max_length=120, verbose_name="Title")
    description = models.CharField(max_length=158, verbose_name="Description")
    keywords = models.CharField(max_length=255, verbose_name="Keywords")
    slug = models.CharField(max_length=128, unique=True, db_index=True, verbose_name="Slug", blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts', verbose_name="Category")
    body = models.TextField(verbose_name="Body")
    body_preview = models.TextField(verbose_name="Body Preview")
    read = models.IntegerField(verbose_name="Read", default=0)
    state = models.IntegerField(verbose_name="State", default=0)
    publish_date = models.DateTimeField(verbose_name="Publish Date", blank=True, null=True)

    class Meta:
        db_table = settings.DB_TABLE_PREFIX + 'post'
        ordering = ['-publish_date']

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if force_insert and not self.slug:
            self.slug = '%s-%s' % (slugify(self.title), get_random_string(3))
