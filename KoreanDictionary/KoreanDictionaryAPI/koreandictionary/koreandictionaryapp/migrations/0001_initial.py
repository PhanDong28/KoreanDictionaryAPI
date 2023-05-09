# Generated by Django 4.1.3 on 2022-12-04 03:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DetailChina',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('china_word', models.CharField(max_length=255)),
                ('short_meaning', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='OriginalWord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_word', models.CharField(max_length=255)),
                ('short_meaning', models.CharField(max_length=255, null=True)),
                ('word_type', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='FullMeaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('short_meaning', models.CharField(max_length=255)),
                ('full_meaning', models.CharField(max_length=255, null=True)),
                ('original_word', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='full_meaning', to='koreandictionaryapp.originalword')),
            ],
        ),
        migrations.CreateModel(
            name='DetailChinaMeaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meaning_first', models.CharField(max_length=255)),
                ('meaning_second', models.CharField(max_length=255, null=True)),
                ('meaning_third', models.CharField(max_length=255, null=True)),
                ('detail_china', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='detail_china_meaning', to='koreandictionaryapp.detailchina')),
            ],
        ),
        migrations.AddField(
            model_name='detailchina',
            name='original_word',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='detail_china', to='koreandictionaryapp.originalword'),
        ),
    ]