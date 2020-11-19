from django.db import models
from django.conf import settings
from users.models import User

LANGUAGE_CHOICES = sorted([('javascript', 'javascript'), ('python', 'python')])

class Snippet(models.Model):
	owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='snippets', on_delete=models.CASCADE)
	created = models.DateTimeField(auto_now_add=True)
	name = models.CharField(max_length=100, blank=True, default='')
	code = models.TextField(default='# write some code')
	state = models.CharField(max_length=100, blank=True, default='')
	language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)

	class Meta:
		ordering = ['created']

	def save(self, *args, **kwargs):
		"""
		"""
		options = {'name': self.name} if self.name else {}
		super(Snippet, self).save(*args, **kwargs)