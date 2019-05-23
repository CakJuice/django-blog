from django.core.paginator import Paginator
from django.http import JsonResponse
from sorl.thumbnail import get_thumbnail

from blog_project.tools import dict_pagination
from .models import FileMedia


# Create your views here.

def ajax_media_index(request):
    file_queryset = FileMedia.objects.all()
    paginator = Paginator(file_queryset, 10)
    page = request.GET.get('page', '1')
    files = paginator.get_page(page)

    num_pages = files.paginator.num_pages
    pagination = dict_pagination(int(page), num_pages)
    if pagination:
        pagination.update({
            'num_pages': num_pages,
            'has_prev': files.has_previous(),
            'has_next': files.has_next(),
        })

    file_list = []

    for file in files:
        file_list.append({
            'name': file.name,
            'media': file.media.url,
            'alt': file.alt,
            'description': file.description,
            'thumbnail': get_thumbnail(file.media, '125x125', crop='center').url
        })

    return JsonResponse({
        'success': True,
        'files': file_list,
        'pagination': pagination
    })
