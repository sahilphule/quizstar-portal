FROM python
WORKDIR /app
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip
COPY ./requirements.txt .

RUN pip install --no-cache-dir -r ./requirements.txt

COPY ./ ./

EXPOSE 8000
ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
