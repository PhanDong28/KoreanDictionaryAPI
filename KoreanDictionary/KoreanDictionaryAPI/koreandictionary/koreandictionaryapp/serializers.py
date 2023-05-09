from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import *


class OriginalWordSerializer(ModelSerializer):
    class Meta:
        model = OriginalWord
        fields = '__all__'


class DetailChinaSerializer(ModelSerializer):
    original_word = OriginalWordSerializer()

    class Meta:
        model = DetailChina
        fields = '__all__'


class DetailChinaSerializer2(ModelSerializer):
    class Meta:
        model = DetailChina
        fields = '__all__'


class DetailChinaMeaningSerializer(ModelSerializer):
    detail_china = DetailChinaSerializer2()

    class Meta:
        model = DetailChinaMeaning
        fields = '__all__'


class FullMeaningSerializer(ModelSerializer):
    original_word = OriginalWordSerializer()

    class Meta:
        model = FullMeaning
        fields = '__all__'