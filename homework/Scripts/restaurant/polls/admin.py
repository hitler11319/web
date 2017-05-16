from django.contrib import admin

from .models import Restaurant, Menu

class MenuInline(admin.TabularInline):
    model = Menu
    extra = 15

class RestaurantAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['restaurant_name']}),
        (None, 				 {'fields': ['address']}),
    ]

    inlines = [MenuInline]
    list_display = ('restaurant_name', 'address')
    list_filter = ['address']
    search_fields = ['restaurant_name']

admin.site.register(Restaurant, RestaurantAdmin)