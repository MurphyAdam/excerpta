"""projectx URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from frontend import views
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap
from snippets.models import Snippet

info_dict = {
    'queryset': Snippet.objects.all(),
    'date_field': 'created',
}

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/', include('snippets.urls')),
    path('api/', include('users.urls')),
    path('api/auth/', include('rest_auth.urls')),
    path('api/auth/registration/', include('rest_auth.registration.urls')),
    path('api/security/', include('security.urls')),
    path('sitemap.xml', sitemap,{'sitemaps': {'snippets': GenericSitemap(info_dict, priority=0.6)}}, name='django.contrib.sitemaps.views.sitemap'),
    re_path(r'^', views.FrontendAppView.as_view()),
]
