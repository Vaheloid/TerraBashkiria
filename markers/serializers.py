"""Markers serializers."""

from rest_framework_gis import serializers
from markers.models import (
    Municipal, Mountains, Waterfalls, 
    Rocks, Caves, Mausoleums, Lakes, Reservoirs
)

class TurobjectSerializer(serializers.GeoFeatureModelSerializer): # Туристические объекты
    """Turobject GeoJSON serializer."""
    class Meta:
        """Turobject serializer meta class."""

        fields = ("id", "name", "type", "short_description", "description", "district", "photo", "amenity", "amenity1")
        geo_field = "location"

class MunicipalSerializer(serializers.GeoFeatureModelSerializer): # Туристические объекты
    """Municipal GeoJSON serializer."""
    class Meta:
        """Municipal serializer meta class."""
        fields = ("id", "name", "area", "amenity", "amenity1")
        geo_field = "mpoly"
        model = Municipal

class MountainsSerializer(TurobjectSerializer): # Туристические объекты
    """Mountains GeoJSON serializer."""
    class Meta(TurobjectSerializer.Meta):
        """Mountains serializer meta class."""
        model = Mountains

class WaterfallsSerializer(TurobjectSerializer): # Туристические объекты
    """Waterfalls GeoJSON serializer."""
    class Meta(TurobjectSerializer.Meta):
        """Waterfalls serializer meta class."""
        model = Waterfalls

class RocksSerializer(TurobjectSerializer): # Туристические объекты
    """Rocks GeoJSON serializer."""
    class Meta(TurobjectSerializer.Meta):
        """Rocks serializer meta class."""
        model = Rocks

class CavesSerializer(TurobjectSerializer): # Туристические объекты
    """Caves GeoJSON serializer."""
    class Meta(TurobjectSerializer.Meta):
        """Caves serializer meta class."""
        model = Caves

class MausoleumsSerializer(TurobjectSerializer): # Туристические объекты
    """Mausoleums GeoJSON serializer."""
    class Meta(TurobjectSerializer.Meta):
        """Mausoleums serializer meta class."""
        model = Mausoleums

class LakesSerializer(TurobjectSerializer): # Туристические объекты
    """Lakes GeoJSON serializer."""
    class Meta(TurobjectSerializer.Meta):
        """Lakes serializer meta class."""
        model = Lakes

class ReservoirsSerializer(TurobjectSerializer): # Туристические объекты
    """Reservoirs GeoJSON serializer."""
    class Meta(TurobjectSerializer.Meta):
        """Reservoirs serializer meta class."""
        model = Reservoirs