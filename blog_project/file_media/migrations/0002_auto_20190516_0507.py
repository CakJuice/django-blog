# Generated by Django 2.2.1 on 2019-05-16 05:07

import blog_project.file_media.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('file_media', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filemedia',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='medias', to=settings.AUTH_USER_MODEL, verbose_name='Created By'),
        ),
        migrations.AlterField(
            model_name='filemedia',
            name='media',
            field=models.ImageField(upload_to=blog_project.file_media.models.upload_file_media, verbose_name='Media'),
        ),
    ]
