from django.contrib import admin
from django.urls import path
from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from . import views
from .admin import admin_site

router = DefaultRouter()
router.register(prefix='original-word', viewset=views.OriginalWordViewSet, basename='original-word')
router.register(prefix='detail-china', viewset=views.DetailChinaViewSet, basename='detail-china')
router.register(prefix='detail-china-meaning', viewset=views.DetailChinaMeaningViewSet, basename='detail-china-meaning')
router.register(prefix='full-meaning', viewset=views.FullMeaningViewSet, basename='full-meaning')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin_site.urls)
]