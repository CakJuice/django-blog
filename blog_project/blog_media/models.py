import os
from datetime import datetime
from uuid import uuid4

from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


def upload_image_media(instance, filename):
    now = datetime.now()
    path = '%d/%d' % (now.year, now.month)
    ext = filename.split('.')[-1]
    new_name = '%s.%s' % (uuid4().hex, ext)
    return os.path.join(path, new_name)


# Create your models here.
class ImageMedia(models.Model):
    image = models.ImageField(upload_to=upload_image_media, verbose_name=_("Image"))
    name = models.ImageField(max_length=100, verbose_name=_("Name"))
    alt = models.CharField(max_length=100, verbose_name=_("Alt"), blank=True, null=True)
    description = models.CharField(max_length=158, verbose_name=_("Description"), blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created At"))

    class Meta:
        db_table = settings.DB_TABLE_PREFIX + 'image_media'
        ordering = ['-created_at']

    def __str__(self):
        return self.name
