# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from tierlist.models import Company, Vote, Profile

admin.site.register(Company)
admin.site.register(Vote)
admin.site.register(Profile)
