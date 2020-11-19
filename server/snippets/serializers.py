from rest_framework import serializers
from snippets.models import Snippet
from django.contrib.auth.models import User

class SnippetSerializer(serializers.ModelSerializer):
	owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

	class Meta:
		model = Snippet
		fields = ['id', 'owner', 'name', 'code', 'state', 'language']
