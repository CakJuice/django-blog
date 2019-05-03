from django.conf import settings
from django.db import models


# Create your models here.
class Language(models.Model):
    code = models.CharField(max_length=6, unique=True, db_index=True, verbose_name="Code")
    name = models.CharField(max_length=64, verbose_name="Name")

    class Meta:
        db_table = settings.DB_TABLE_PREFIX + 'language'
        ordering = ['code']
