# -*- coding: utf-8 -*-
# Generated by Django 1.11rc1 on 2017-06-05 05:08
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('juice', '0007_auto_20170605_1255'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='list',
            name='List_time',
        ),
    ]
