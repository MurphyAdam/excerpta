from django.views.decorators.csrf import ensure_csrf_cookie, get_token
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from marshmallow import pprint
from users.serializers import UserSerializer

@ensure_csrf_cookie
def get_csrf_token(request):
	"""
	This will be `/api/set-csrf-cookie/` on `urls.py`
	"""
	token = get_token(request)
	return JsonResponse({"csrftoken": token})


class CheckAuth(APIView):
	authentication_classes = [SessionAuthentication]

	def get(self, request, format=None):
		user = UserSerializer(request.user, context={'request': request})
		return Response({
			'message': 'You are authenticated', 
			'user': user.data
			})