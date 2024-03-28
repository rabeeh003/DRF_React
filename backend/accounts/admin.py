from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import UserDetail

# Register your models here.
class UDTable(admin.ModelAdmin):
    list_display = ('id', 'get_product_image', 'user', 'dob', 'phone')
    def get_product_image(self, obj):
        image_url = obj.profile.url if obj.profile else ''
        if image_url:
            return mark_safe(f'<img src="{image_url}" width="50" height="50" />')
        return 'No Image'

    get_product_image.allow_tags = True
    get_product_image.short_description = 'Product Image'
    
admin.site.register(UserDetail, UDTable)