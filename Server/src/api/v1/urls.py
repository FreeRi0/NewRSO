from django.urls import path
from django.contrib import admin

from api.auth.auth import login_view, register_view
import api.v1.system.views
from django.urls import path, include


urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('admin/', admin.site.urls),
    path('api/', include('apps.api.auth.urls')),  # auth URLs
    path('api/v1/', include('apps.api.v1.urls')),  # API URLs
]
