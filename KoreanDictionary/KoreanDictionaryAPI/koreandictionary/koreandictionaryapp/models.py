from django.db import models


# Create your models here.
class OriginalWord(models.Model):
    original_word = models.CharField(max_length=255, null=False)
    short_meaning = models.CharField(max_length=255, null=True)
    word_type = models.CharField(max_length=255)
    pronounce = models.CharField(max_length=255, null=True)
    han_viet = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.original_word


class DetailChina(models.Model):
    china_word = models.CharField(max_length=255, null=False)
    short_meaning = models.CharField(max_length=255, null=False)
    original_word = models.ForeignKey(OriginalWord, related_name='detail_china', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.china_word


class DetailChinaMeaning(models.Model):
    meaning_first = models.CharField(max_length=255, null=False)
    meaning_second = models.CharField(max_length=255, null=True)
    meaning_third = models.CharField(max_length=255, null=True)
    detail_china = models.ForeignKey(DetailChina, related_name='detail_china_meaning', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.meaning_first


class FullMeaning(models.Model):
    short_meaning = models.CharField(max_length=255, null=False)
    full_meaning = models.CharField(max_length=255, null=True)
    example_1 = models.CharField(max_length=255, null=True)
    example_2 = models.CharField(max_length=255, null=True)
    original_word = models.ForeignKey(OriginalWord, related_name='full_meaning', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.short_meaning
