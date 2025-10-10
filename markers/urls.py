"""Markers urls."""

from django.urls import path
from markers import views
from django.conf import settings
from django.conf.urls.static import static

from markers.views import MapView, ObjectsInfoView

app_name = "markers"

urlpatterns = [
    path("", MapView.as_view(), name='View'),
    path("objects_info/", ObjectsInfoView.as_view(), name='ObjectsInfoView'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)