#!bin/sh
python manage.py makemigrations
python manage.py migrate
# python manage.py runserver 0.0.0.0:8000
if [ ! -d static/ ]
then 
    python manage.py collectstatic
else
    echo "static files are already present"
fi
gunicorn core.wsgi:application --bind 0.0.0.0:8000