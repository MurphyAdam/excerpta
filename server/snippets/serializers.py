from rest_framework import serializers
from snippets.models import Snippet
from django.contrib.auth.models import User
from users.serializers import UserSerializer

class SnippetSerializer(serializers.ModelSerializer):
	"""
	serializers.PrimaryKeyRelatedField returns user id, but we would like more 
	then just the id, thus we use UserSerializer to retrieve also addional data
	owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
	"""
	owner = UserSerializer(many=False, read_only=True)

	class Meta:
		model = Snippet
		fields = ['id', 'owner', 'name', 'code', 'state', 'language', 'private', 'created']
