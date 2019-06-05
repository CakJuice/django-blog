# Generated by Django 2.2.1 on 2019-05-14 08:43

import blog_project.file_media.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FileMedia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('media', models.FileField(upload_to=blog_project.file_media.models.upload_file_media, verbose_name='Media')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('alt', models.CharField(blank=True, max_length=100, null=True, verbose_name='Alt')),
                ('description', models.CharField(blank=True, max_length=158, null=True, verbose_name='Description')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
            ],
            options={
                'db_table': 'djwb_file_media',
                'ordering': ['-created_at'],
            },
        ),
    ]