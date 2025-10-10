"""Markers API URL Configuration."""

from rest_framework import routers
from markers.viewsets import (
    MunicipalViewSet, MountainsViewSet, WaterfallsViewSet,
    RocksViewSet, CavesViewSet, MausoleumsViewSet,
    LakesViewSet, ReservoirsViewSet
)
router = routers.DefaultRouter()

router.register(r"municipal", MunicipalViewSet)
router.register(r"mountains", MountainsViewSet)
router.register(r"waterfalls", WaterfallsViewSet)
router.register(r"rocks", RocksViewSet)
router.register(r"caves", CavesViewSet)
router.register(r"mausoleums", MausoleumsViewSet)
router.register(r"lakes", LakesViewSet)
router.register(r"reservoirs", ReservoirsViewSet)

urlpatterns = router.urls