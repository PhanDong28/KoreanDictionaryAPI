from django.contrib import admin
from .models import *

# Register your models here.

class KoreanDictionaryAdminSite(admin.AdminSite):
    site_header ='Korean Dictionary'
    index_title = 'Korean Dictionary Admin Site'


admin_site = KoreanDictionaryAdminSite('Korean Dictionary')


class FullMeaningInline(admin.StackedInline):
    model = FullMeaning


class OriginalWordAdmin(admin.ModelAdmin):
    inlines = (FullMeaningInline, )


class DetailChinaMeaningInline(admin.StackedInline):
    model = DetailChinaMeaning


class DetailChinaMeaningAdmin(admin.ModelAdmin):
    list_display = ['id', 'meaning_first', 'meaning_second', 'meaning_third', 'detail_china']


class DetailChinaAdmin(admin.ModelAdmin):
    list_display = ['id', 'china_word', 'short_meaning', 'original_word']
    inlines = (DetailChinaMeaningInline, )


class FullMeaningAdmin(admin.ModelAdmin):
    list_display = ['short_meaning', 'full_meaning', 'original_word']


admin_site.register(OriginalWord, OriginalWordAdmin)
admin_site.register(DetailChina, DetailChinaAdmin)
admin_site.register(DetailChinaMeaning, DetailChinaMeaningAdmin)
admin_site.register(FullMeaning, FullMeaningAdmin)
