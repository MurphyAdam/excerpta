from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import permissions
from snippets.permissions import IsOwnerOrReadOnly
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
			'snippets': reverse('snippet-list', request=request, format=format)
		})

class SnippetViewSet(viewsets.ModelViewSet):
	"""
	This viewset automatically provides `list`, `create`, `retrieve`,
	`update` and `destroy` actions.

	Additionally we also provide an extra `highlight` action.
	"""
	queryset = Snippet.objects.all()
	serializer_class = SnippetSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly, 
	IsOwnerOrReadOnly]

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)
