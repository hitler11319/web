from django.contrib import admin

from .models import Photo, Post

class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 5

class PostAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['author']}),
        (None, 				 {'fields': ['title']}),
        (None, 				 {'fields': ['text']}),
        (None, 				 {'fields': ['create_date']}),
        (None, 				 {'fields': ['published_date']}),
    ]

    inlines = [PhotoInline]
    list_display = ('author', 'title', 'text', 'create_date', 'published_date')
    list_filter = ['title']
    search_fields = ['author']

admin.site.register(Post, PostAdmin)