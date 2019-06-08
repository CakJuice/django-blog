from django.shortcuts import render


def reactjs(request):
    return render(request, 'build/index.html')
