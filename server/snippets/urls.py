from django.urls import path
from snippets.views import SnippetViewSet, api_root
from rest_framework.urlpatterns import format_suffix_patterns

snippet_list = SnippetViewSet.as_view({
		'get': 'list',
		'post': 'create'
	})

snippet_detail = SnippetViewSet.as_view({
		'get': 'retrieve',
		'put': 'update',
		'patch': 'partial_update',
		'delete': 'destroy'
	})

urlpatterns = [
    path('', api_root),
    path('snippets/', snippet_list, name='snippet-list'),
    path('snippets/<int:pk>/', snippet_detail, name='snippet-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
