from rest_framework import generics, status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema



@extend_schema(
    tags=['Authentication'],
    summary="Обновление access токена",
    description="Обновление access токена по refresh токену.",
    responses={200: "Новый access токен."})
class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

@extend_schema(
    tags=['Authentication'],
    summary="Аутентификация пользователя",
    description="Получение access и refresh токенов по логину и паролю.")
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]



@extend_schema(
    tags=['Authentication'],
    summary="Регистрация нового пользователя",
    description="Создаёт нового пользователя и возвращает access/refresh токены.",)
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": f"Пользователь {user.username} зарегестирован",
            "email": user.email,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
