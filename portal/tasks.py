# portal/tasks.py
from celery import shared_task
from datetime import datetime
from . models import Time, TestStatus, TestHour
from datetime import datetime, timedelta
import pytz

@shared_task
def print_hello():
    current_time = datetime.now(pytz.utc)
    current_time = datetime(year=1, month=1, day=1, hour=current_time.hour,
                      minute=current_time.minute, second=current_time.second)
    times = Time.objects.all() # fetching

    for time in times:
        user_start_time = datetime(year=1, month=1, day=1, hour=time.start_time.hour,
                      minute=time.start_time.minute, second=time.start_time.second)
        time_difference = current_time-user_start_time
        print(time_difference)

        test_hours = TestHour.objects.filter(test=time.test).first()

        if(time_difference >= timedelta(hours=test_hours.time.hour, minutes=test_hours.time.minute, seconds=test_hours.time.second)):
            test_status = TestStatus.objects.filter(user=time.user, test=time.test).first()
            if(test_status is None):
                return
            test_status.test_status = '2'
            test_status.save()
