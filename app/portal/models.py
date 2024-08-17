from django.db import models
from django.contrib.auth.models import User
from tinymce.models import HTMLField

# Create your models here.


class Test(models.Model):
    test_name = models.CharField(max_length=100)
    test_question_no = models.BigIntegerField(default=0)
    instructions = HTMLField(default='')
    created_date = models.DateField(auto_now_add=True)
    activated = models.BooleanField(default = False)

    def __str__(self):
        return f"{self.test_name}"


class Question(models.Model):
    test = models.ForeignKey(
        Test, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    questionIsCode = models.BooleanField()

    op1 = models.TextField()
    op1IsCode = models.BooleanField(default=False)

    op2 = models.TextField()
    op2IsCode = models.BooleanField(default=False)

    op3 = models.TextField()
    op3IsCode = models.BooleanField(default=False)

    op4 = models.TextField()
    op4IsCode = models.BooleanField(default=False)

    correct_op = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.question}"


class TestStatus(models.Model):
    class TypeChoices(models.TextChoices):
        TEST_START = '1', 'Test Start'
        TEST_FINISHED = '2', 'Test Finished'
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    test_status = models.CharField(
        max_length=1, choices=TypeChoices.choices, default='1')

    def __str__(self):
        return f"{self.user} ({self.test.test_name} = {self.test_status})"


class UserAnswers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user_option = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.question} ({self.user_option})"


class Time(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=True, auto_now=False)

    def __str__(self):
        return f"{self.user.username} ({self.start_time.hour}:{self.start_time.minute})"


class TestHour(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    time = models.TimeField()

    def __str__(self):
        return f"{self.test.test_name} ({self.time})"


class ExcelFile(models.Model):
    file = models.FileField(upload_to="excel")
