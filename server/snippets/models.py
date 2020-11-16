from django.db import models
from django.conf import settings
from pygments.lexers import get_lexer_by_name
from pygments.styles import get_all_styles
from pygments.formatters.html import HtmlFormatter
from pygments import highlight

STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])
LANGUAGE_CHOICES = sorted([('js', 'javascript'), ('py', 'python')])

class Snippet(models.Model):
	owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='snippets', on_delete=models.CASCADE)
	highlighted = models.TextField()
	created = models.DateTimeField(auto_now_add=True)
	title = models.CharField(max_length=100, blank=True, default='')
	code = models.TextField(default='# write some code')
	linenos = models.BooleanField(default=False)
	state = models.CharField(max_length=100, blank=True, default='')
	language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
	style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)

	class Meta:
		ordering = ['created']

	def save(self, *args, **kwargs):
		"""
		"""
		lexer = get_lexer_by_name(self.language)
		linenos = 'table' if self.linenos else False
		options = {'title': self.title} if self.title else {}
		formatter = HtmlFormatter(style=self.style, linenos=linenos, 
			full=True, **options)
		self.highlighted = highlight(self.code, lexer, formatter)
		super(Snippet, self).save(*args, **kwargs)