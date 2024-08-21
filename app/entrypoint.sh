#!bin/sh
python manage.py makemigrations
python manage.py migrate
# python manage.py runserver 0.0.0.0:8000
if [ ! -d ./nginx/staticfiles/ ]
then 
    python manage.py collectstatic
else
    echo "staticfiles are already present"
fi
gunicorn core.wsgi:application --bind 0.0.0.0:8000