from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


# Create your views here.
def index(request):
    return redirect('admin_dashboard')


@login_required
def dashboard(request):
    return render(request, 'admin/dashboard.html')
