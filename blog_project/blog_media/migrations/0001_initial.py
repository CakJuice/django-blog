# Generated by Django 2.2.1 on 2019-05-12 07:43

import blog_project.blog_media.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ImageMedia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=blog_project.blog_media.models.upload_image_media, verbose_name='Image')),
                ('name', models.ImageField(upload_to='', verbose_name='Name')),
                ('alt', models.CharField(blank=True, max_length=100, null=True, verbose_name='Alt')),
                ('description', models.CharField(blank=True, max_length=158, null=True, verbose_name='Description')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
            ],
            options={
                'db_table': 'djwb_image_media',
                'ordering': ['-created_at'],
            },
        ),
    ]
