FROM python:3.7
LABEL maintainer="hd.brandoz@gmail.com"

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN pip install -r requirements.txt