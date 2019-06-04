FROM ubuntu:18.04
LABEL maintainer="hd.brandoz@gmail.com"

ENV DEBIAN_FRONTEND=noninteractive
ENV LANG C.UTF-8

RUN apt update && apt upgrade -y
RUN apt install -y python3 python3-dev python3-pip gettext postgresql-client libpq-dev

RUN mkdir /app
COPY . /app/
WORKDIR /app

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt