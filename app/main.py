import os

if os.getenv('ENVIRONMENT') == 'development':
    os.system('python manage.py runserver 127.0.0.1:8000')
else:
    os.system('gunicorn core.wsgi:application --bind 0.0.0.0:8000')