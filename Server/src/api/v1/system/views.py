from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.system.models import Profile, Detachment
from apps.system.serializers import ProfileSerializer, DetachmentSerializer


@api_view(['GET', 'POST'])
def profile_list_create(request):
    if request.method == 'GET':
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def profile_detail(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        raise Http404

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def detachment_list_create(request):
    if request.method == 'GET':
        detachments = Detachment.objects.all()
        serializer = DetachmentSerializer(detachments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DetachmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def detachment_detail(request, pk):
    try:
        detachment = Detachment.objects.get(pk=pk)
    except Detachment.DoesNotExist:
        raise Http404

    if request.method == 'GET':
        serializer = DetachmentSerializer(detachment)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = DetachmentSerializer(detachment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        detachment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class UserSystemEditView(TemplateView):
#     template_name = 'profile/profile_settings/system.html'
#
#     def get(self, request, *args, **kwargs):
#         login_change_form = UserLoginEditForm(self.request.GET or None)
#         password_change_form = UserPasswordEditForm(self.request.GET or None, self.request.user)
#         context = self.get_context_data(**kwargs)
#         context['login_change_form'] = login_change_form
#         context['password_change_form'] = password_change_form
#         return self.render_to_response(context)
#
#
# class UserLoginEditView(PasswordContextMixin, FormView):
#     form_class = UserLoginEditForm
#     success_url = reverse_lazy("profile_settings_system")
#     template_name = "profile/profile_settings/system.html"
#     title = _("Login change")
#     model = User
#
#     @method_decorator(sensitive_post_parameters())
#     @method_decorator(csrf_protect)
#     @method_decorator(login_required)
#     def dispatch(self, *args, **kwargs):
#         return super().dispatch(*args, **kwargs)
#
#     def get_form_kwargs(self):
#         kwargs = super().get_form_kwargs()
#         kwargs["user"] = self.request.user
#         return kwargs
#
#     def form_valid(self, form):
#         form.save()
#         # Updating the username logs out all other sessions for the user
#         # except the current one.
#         update_session_auth_hash(self.request, form.user)
#         return super().form_valid(form)
#
#     def post(self, request, *args, **kwargs):
#         login_change_form = self.form_class(request.POST)
#         password_change_form = UserPasswordEditForm()
#         if login_change_form.is_valid():
#             login_change_form.save()
#             return self.render_to_response(
#                 self.get_context_data(
#                     success=True
#                 )
#             )
#         else:
#             return self.render_to_response(
#                 self.get_context_data(
#                     login_change_form=login_change_form,
#                 )
#             )
#
#
# class UserPasswordEditView(PasswordContextMixin, FormView):
#     form_class = UserPasswordEditForm
#     success_url = reverse_lazy("profile_settings_system")
#     template_name = "profile/profile_settings/system.html"
#     title = _("Password change")
#
#     @method_decorator(sensitive_post_parameters())
#     @method_decorator(csrf_protect)
#     @method_decorator(login_required)
#     def dispatch(self, *args, **kwargs):
#         return super().dispatch(*args, **kwargs)
#
#     def get_form_kwargs(self):
#         kwargs = super().get_form_kwargs()
#         kwargs["user"] = self.request.user
#         return kwargs
#
#     def form_valid(self, form):
#         form.save()
#         # Updating the password logs out all other sessions for the user
#         # except the current one.
#         update_session_auth_hash(self.request, form.user)
#         return super().form_valid(form)
#
#     def post(self, request, *args, **kwargs):
#         password_change_form = self.form_class(request.POST)
#         login_change_form = UserLoginEditForm()
#         if password_change_form.is_valid():
#             password_change_form.save()
#             return self.render_to_response(
#                 self.get_context_data(
#                     success=True
#                 )
#             )
#         else:
#             return self.render_to_response(
#                 self.get_context_data(
#                     password_change_form=password_change_form,
#                 )
#             )
