# Register your models here.
from django.contrib.gis import admin
from markers.models import (
    Municipal, Mountains, Waterfalls, 
    Rocks, Caves, Mausoleums, Lakes, Reservoirs
)

class TurobjectAdmin(admin.GISModelAdmin):
    """Turobject admin."""
    #Задаем начальное положение карты
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 8,
            'default_lon': 55.9678,
            'default_lat': 54.7431,
        },
    }
    list_display = ("name", "type", "short_description", "description", "district","photo")

@admin.register(Municipal)
class MunicipalAdmin(admin.GISModelAdmin):
    """Municipal admin."""
    #Задаем начальное положение карты
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 8,
            'default_lon': 55.9678,
            'default_lat': 54.7431,
        },
    }
    list_display = ("name", "area")

@admin.register(Mountains)
class MountainsAdmin(TurobjectAdmin):
    """Mountains admin."""
    pass

@admin.register(Waterfalls)
class WaterfallsAdmin(TurobjectAdmin):
    """Waterfalls admin."""
    pass

@admin.register(Rocks)
class RocksAdmin(TurobjectAdmin):
    """Rocks admin."""
    pass

@admin.register(Caves)
class CavesAdmin(admin.GISModelAdmin):
    """Caves admin."""
    pass

@admin.register(Mausoleums)
class MausoleumsAdmin(admin.GISModelAdmin):
    """Mausoleums admin."""
    pass

@admin.register(Lakes)
class LakesAdmin(admin.GISModelAdmin):
    """Lakes admin."""
    pass

@admin.register(Reservoirs)
class ReservoirsAdmin(admin.GISModelAdmin):
    """Reservoirs admin."""
    pass