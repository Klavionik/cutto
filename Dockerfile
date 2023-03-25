FROM python:3.10.2-slim-bullseye
ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN pip install poetry==1.4.1
RUN poetry config virtualenvs.create false
COPY poetry.lock pyproject.toml ./
RUN poetry install --no-root --without=dev
COPY . .

ARG USER=app
ARG UID=1000
RUN groupadd $USER --gid $UID
RUN useradd $USER --uid $UID --gid $UID --no-create-home
USER app:app
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
