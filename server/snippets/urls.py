from django.urls import path
from snippets.views import SnippetViewSet, api_root, MySnippetViewSet
from rest_framework.urlpatterns import format_suffix_patterns

snippet_list = SnippetViewSet.as_view({
		'get': 'list',
	})

snippet_detail = SnippetViewSet.as_view({
		'get': 'retrieve',
	})

owned_snippet_list = MySnippetViewSet.as_view({
		'get': 'list',
		'post': 'create'
	})

owned_snippet_detail = MySnippetViewSet.as_view({
		'get': 'retrieve',
		'put': 'update',
		'patch': 'partial_update',
		'delete': 'destroy'
	})


urlpatterns = [
    path('', api_root),
    path('snippets/', snippet_list, name='snippet-list'),
    path('snippets/<int:pk>/', snippet_detail, name='snippet-detail'),
    path('snippets/owned/', owned_snippet_list, name='owned-snippet-list'),
    path('snippets/owned/<int:pk>/', owned_snippet_detail, name='owned-snippet-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
