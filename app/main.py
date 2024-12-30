import os

if os.getenv('ENVIRONMENT') == 'production':
    os.system('python manage.py collectstatic --noinput')
    os.system('gunicorn core.wsgi:application --bind 0.0.0.0:8000')
else:
    os.system('python manage.py runserver 0.0.0.0:8000')