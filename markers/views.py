"""Markers view."""

from django.views.generic.base import TemplateView
from django.shortcuts import render

class MainPageView(TemplateView):
    """Markers map view."""
    template_name = "sidebarmenu.html"

class MapView(TemplateView):
    """Markers map view."""
    template_name = "map.html"

class ObjectsInfoView(TemplateView):
    """Markers map view."""
    template_name = "objectsinfo.html"