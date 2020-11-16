from django.db import models
from django.contrib.auth.models import AbstractUser
from users.managers import CustomUserManager
from hashlib import md5

class User(AbstractUser):
    """
    Custom user model with an email as unique identifier
    """
    email = models.EmailField('Email address', unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    @property
    def links(self):
        return {'avatar': self.avatar(128), }

    def avatar(self, size=128):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=monsterid&s={}'.format(
            digest, size)

    def __str__(self):
        return self.email
