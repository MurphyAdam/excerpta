#Bugs 

Bugs I ran into and their fixes:

1 bug:
AssertionError: `HyperlinkedIdentityField` requires the request in the serializer context. Add `context={'request': request}` when instantiating the serializer.

1 fix:

if you keep getting a HyperlinkedRelatedField needs a request context even after changing your serializers to be using ModelSerializer and PrimaryKeyRelatedField (your UserSerializer), check if the fiedls list of your meta class has a 'url' property, if so, remove it. 


#Notes

1. start a new Django project:
> django-admin startprojec

2. start a new Django app
> django-admin startapp	

3. if app has models
> python manage.py makemigrations app_name

4. if you use an AbstractUser instead of Django's default user
> before you run any other migrations or do anything database related, make sure you first:
> > python manage.py makemigrations app_name
where app_name is where you defined your User model; after this, you can processed with other
migrations which will depened on it.

5. if you edit how you may authenticate/ create_user|superuser with/of your Django apps/ admin:
> if you have so, you may need to create a a custom manager 
that will inherit from `from django.contrib.auth.base_user import BaseUserManager` your custom manager class will need to go in your custom User model's objects property such as `objects = CustomUserManager()`

6. python manage.py migrate after every change in your models (field edits, deletes)