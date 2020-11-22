from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import permissions
from snippets.permissions import IsOwner, IsOwnerOrReadOnly
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import renderers
from rest_framework import viewsets

@api_view(['GET'])
def api_root(request, format=None):
	"""
	This is the api root view. It provides the available views.
	"""
	return Response({
			'users': reverse('user-list', request=request, format=format),
			'snippets': reverse('snippet-list', request=request, format=format),
			'owned-snippets': reverse('owned-snippet-list', request=request, format=format),
		})

class SnippetViewSet(viewsets.ReadOnlyModelViewSet):
	"""
	This viewset only provides the 'read-only' actions, .list() and .retrieve()

	This is used to `list` all the snippets whose private property is 
	set to `False`.
	"""
	serializer_class = SnippetSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get_queryset(self):
		queryset = Snippet.objects.all()
		queryset = queryset.filter(private=False)
		return queryset

class MySnippetViewSet(viewsets.ModelViewSet):
	"""
	This viewset automatically provides `list`, `create`, `retrieve`,
	`update` and `destroy` actions for the current authenticated user.

	"""
	serializer_class = SnippetSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwner]

	def get_queryset(self):
		user = self.request.user
		snippets = user.snippets.all()
		if snippets:
			return snippets
		return [Snippet.objects.get(pk=72)]

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)