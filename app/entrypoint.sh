#!bin/sh
python manage.py makemigrations --noinput
python manage.py migrate --noinput
# python manage.py runserver 0.0.0.0:8000
python manage.py collectstatic --noinput
# if [ ! -d ./nginx/staticfiles/ ]
# then
#     python manage.py collectstatic
# else
#     echo "staticfiles are already present"
# fi
gunicorn core.wsgi:application --bind 0.0.0.0:8000