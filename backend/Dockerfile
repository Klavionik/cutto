FROM python:3.10.2-slim-bullseye
ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update && apt-get install -y gcc libpq-dev curl
RUN pip install poetry==1.4.1
RUN poetry config virtualenvs.create false
COPY poetry.lock pyproject.toml ./
RUN poetry install --no-root --without=dev
COPY . .
RUN python manage.py collectstatic --noinput

ARG USER=app
ARG UID=1000
RUN groupadd $USER --gid $UID
RUN useradd $USER --uid $UID --gid $UID --no-create-home
USER app:app
EXPOSE 8000