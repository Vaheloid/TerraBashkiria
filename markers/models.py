"""Markers models."""

from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from location_field.models.spatial import LocationField

class Municipal(models.Model): #муниципальные районы
    name = models.CharField(max_length=255, verbose_name='Название')
    mpoly = models.MultiPolygonField(verbose_name='Геометрия')
    amenity = models.CharField(max_length=255, default="Муниципальный район", editable = False) #описывает имя объекта длиной 255
    amenity1 = models.CharField(max_length=255, default="Municipal", editable = False) #описывает имя объекта длиной 255
    area = models.IntegerField(null=True, verbose_name='Территория')
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'Муниципальный район'
        verbose_name_plural = 'Муниципальные районы'

class Turobject(models.Model): #туристические объекты
    location = LocationField(zoom=5, default=Point(55.9678, 54.7431), verbose_name='Расположение')
    name = models.CharField(max_length=255, verbose_name='Название')
    type = models.CharField(max_length=255,null=True, verbose_name='Тип объекта')
    short_description = models.TextField(max_length=255, null=True, verbose_name='Краткое описание') #описание
    description = models.TextField(null=True, verbose_name='Описание') #описание
    district = models.CharField(max_length=255,null=True, verbose_name='Район')
    photo = models.ImageField(upload_to='images/', blank=True, null=True, max_length=255, verbose_name='Фотографии') #ссылка на web страницу без https
    amenity = models.CharField(max_length=255, default="Туристический объект", editable = False) #описывает имя объекта длиной 255
    amenity1 = models.CharField(max_length=255, default="Touristsite", editable = False) #описывает имя объекта длиной 255
    def __str__(self):
        return self.name
    class Meta:
        abstract = True

class Mountains(Turobject): #горы
    class Meta:
        verbose_name = 'Гору'
        verbose_name_plural = 'Горы'

class Waterfalls(Turobject): #водопад
    class Meta:
        verbose_name = 'Водопад'
        verbose_name_plural = 'Водопады'

class Rocks(Turobject): #скалы
    class Meta:
        verbose_name = 'Скалу'
        verbose_name_plural = 'Скалы'

class Caves(Turobject): #пещеры
    class Meta:
        verbose_name = 'Пещеру'
        verbose_name_plural = 'Пещеры'

class Mausoleums(Turobject): #мавзолеи
    class Meta:
        verbose_name = 'Мавзолей'
        verbose_name_plural = 'Мавзолеи'

class Lakes(Turobject): #озёра
    class Meta:
        verbose_name = 'Озеро'
        verbose_name_plural = 'Озёра'

class Reservoirs(Turobject): #водохранилища
    class Meta:
        verbose_name = 'Водохранилище'
        verbose_name_plural = 'Водохранилища'