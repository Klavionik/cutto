from django.core.handlers.wsgi import WSGIRequest


def get_origin_ip(request: WSGIRequest):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")

    if x_forwarded_for:
        return x_forwarded_for.split(", ")[0]

    return request.META["REMOTE_ADDR"]
