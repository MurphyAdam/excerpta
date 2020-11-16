from users.models import User
from rest_framework import viewsets
from users.serializers import UserSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
	"""
	This viewset automatically provides `list` and `detail` actions.
	"""
	queryset = User.objects.all()
	serializer_class = UserSerializer
