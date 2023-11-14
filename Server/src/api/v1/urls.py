from django.contrib import admin
from django.urls import path, include
from api.auth.auth import login_view, register_view

from api.v1.system.views import (
    ProfileListCreateView,
    ProfileDetailView,
    DetachmentListCreateView,
    DetachmentDetailView,
)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('admin/', admin.site.urls),
    path('api/v1/profiles/', ProfileListCreateView.as_view(), name='profile-list-create'),
    path('api/v1/profiles/<int:pk>/', ProfileDetailView.as_view(), name='profile-detail'),
    path('api/v1/detachments/', DetachmentListCreateView.as_view(), name='detachment-list-create'),
    path('api/v1/detachments/<int:pk>/', DetachmentDetailView.as_view(), name='detachment-detail'),
]
