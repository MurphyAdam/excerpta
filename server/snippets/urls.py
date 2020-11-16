from django.urls import path
from snippets.views import SnippetViewSet, api_root
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.renderers import StaticHTMLRenderer

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

snippet_highlight = SnippetViewSet.as_view({
		'get': 'highlight'
	}, renderer_classes=[StaticHTMLRenderer])

urlpatterns = [
    path('', api_root),
    path('snippets/', snippet_list, name='snippet-list'),
    path('snippets/<int:pk>/', snippet_detail, name='snippet-detail'),
    path('snippets/<int:pk>/highlight/', snippet_highlight, name='snippet-highlight'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
