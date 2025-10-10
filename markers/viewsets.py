"""Markers API views."""
from rest_framework import viewsets
from rest_framework_gis import filters
from markers.models import (
    Municipal, Mountains, Waterfalls, 
    Rocks, Caves, Mausoleums, Lakes, Reservoirs
)
from markers.serializers import (
    MunicipalSerializer, MountainsSerializer,
    WaterfallsSerializer, RocksSerializer, CavesSerializer,
    MausoleumsSerializer, LakesSerializer, ReservoirsSerializer
)

class TurobjectViewSet(viewsets.ReadOnlyModelViewSet):
    """Turobject view set."""

    bbox_filter_field = "location"
    filter_backends = (filters.InBBoxFilter,)

class MunicipalViewSet(TurobjectViewSet):
    """Municipal view set."""

    bbox_filter_field = "location"
    filter_backends = (filters.InBBoxFilter,)
    queryset = Municipal.objects.all()
    serializer_class = MunicipalSerializer

class MountainsViewSet(TurobjectViewSet):
    """Mountains view set."""
    queryset = Mountains.objects.all()
    serializer_class = MountainsSerializer

class WaterfallsViewSet(TurobjectViewSet):
    """Waterfalls view set."""
    queryset = Waterfalls.objects.all()
    serializer_class = WaterfallsSerializer

class RocksViewSet(viewsets.ReadOnlyModelViewSet):
    """Rocks view set."""
    queryset = Rocks.objects.all()
    serializer_class = RocksSerializer

class CavesViewSet(viewsets.ReadOnlyModelViewSet):
    """Caves view set."""
    queryset = Caves.objects.all()
    serializer_class = CavesSerializer

class MausoleumsViewSet(viewsets.ReadOnlyModelViewSet):
    """Mausoleums view set."""
    queryset = Mausoleums.objects.all()
    serializer_class = MausoleumsSerializer

class LakesViewSet(viewsets.ReadOnlyModelViewSet):
    """Lakes view set."""
    queryset = Lakes.objects.all()
    serializer_class = LakesSerializer

class ReservoirsViewSet(viewsets.ReadOnlyModelViewSet):
    """Reservoirs view set."""
    queryset = Reservoirs.objects.all()
    serializer_class = ReservoirsSerializer