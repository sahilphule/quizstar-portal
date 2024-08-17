from django.contrib import admin
from .models import Test, Question, TestStatus, UserAnswers, Time, TestHour

# Register your models here.
admin.site.register(Test)
admin.site.register(Question)
admin.site.register(TestStatus)
admin.site.register(UserAnswers)
admin.site.register(Time)
admin.site.register(TestHour)
