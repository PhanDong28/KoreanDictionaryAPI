from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, generics, status, permissions, serializers
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .models import *
from .serializers import *

# Create your views here.


class OriginalWordViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = OriginalWord.objects.all().order_by('id')
    serializer_class = OriginalWordSerializer

    @action(methods=['get'], detail=False, url_path='detail-china')
    def get_detail_china(self, request):
        original_word = self.request.query_params.get('original-word')
        detail_china = OriginalWord.objects.all()
        detail_china = detail_china.filter(original_word=original_word)

        if detail_china:
            detail_china = detail_china[0].detail_china.all()

            return Response(data=DetailChinaSerializer(detail_china, many=True).data,
                        status=status.HTTP_200_OK)

        return Response(data=[], status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='full-meaning')
    def get_full_meaning(self, request):
        original_word = self.request.query_params.get('original-word')
        full_meaning = OriginalWord.objects.all()
        full_meaning = full_meaning.filter(original_word=original_word)

        if full_meaning:
            full_meaning = full_meaning[0].full_meaning.all()

            return Response(data=FullMeaningSerializer(full_meaning, many=True).data,
                            status=status.HTTP_200_OK)

        return Response(data=[], status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='han-viet')
    def get_han_viet(self, request):
        original_word = self.request.query_params.get('original-word')

        try:
            if original_word:
                han_viet = OriginalWord.objects.get(original_word=original_word).han_viet
                if han_viet:
                    return Response(data=han_viet, status=status.HTTP_200_OK)
        except:
            return Response(data='', status=status.HTTP_200_OK)

        return Response(data='', status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='pronounce')
    def get_pronounce(self, request):
        original_word = self.request.query_params.get('original-word')

        try:
            if original_word:
                pronounce = OriginalWord.objects.get(original_word=original_word).pronounce
                if pronounce:
                    return Response(data=pronounce, status=status.HTTP_200_OK)
        except:
            return Response(data='', status=status.HTTP_200_OK)

        return Response(data='', status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='word-type')
    def get_word_type(self, request):
        original_word = self.request.query_params.get('original-word')

        try:
            if original_word:
                word_type = OriginalWord.objects.get(original_word=original_word).word_type
                if word_type:
                    return Response(data=word_type, status=status.HTTP_200_OK)
        except:
            return Response(data='', status=status.HTTP_200_OK)

        return Response(data='', status=status.HTTP_200_OK)


class DetailChinaViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = DetailChina.objects.all().order_by('id')
    serializer_class = DetailChinaSerializer

    @action(methods=['get'], detail=False, url_path='detail-china-meaning')
    def get_detail_china_meaning(self, request):
        original_word = self.request.query_params.get('original-word')
        detail_china_meaning = DetailChinaMeaning.objects.filter(detail_china__original_word__original_word=original_word)
        # detail_china_meaning = detail_china_meaning.detail_china_meaning.all()

        return Response(data=DetailChinaMeaningSerializer(detail_china_meaning, many=True).data,
                        status=status.HTTP_200_OK)


class DetailChinaMeaningViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = DetailChinaMeaning.objects.all().order_by('id')
    serializer_class = DetailChinaMeaningSerializer


class FullMeaningViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = FullMeaning.objects.all().order_by('id')
    serializer_class = FullMeaningSerializer


def index(request):
    return HttpResponse('This is korean dictionary api. Build by Alexander Thinh')
