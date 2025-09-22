from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Note
from .serializers import NoteSerializer
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiExample

@extend_schema(
    tags=['Notes'],
    summary="Управление пользовательскими заметками",
    description="Позволяет пользователю просматривать, создавать, обновлять и удалять свои заметки.",
)
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @extend_schema(
        summary="Получить список заметок",
        description="Возвращает список всех заметок, принадлежащих текущему аутентифицированному пользователю.",
        responses={200: NoteSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Создать новую заметку",
        description="Создаёт новую заметку, автоматически устанавливая текущего пользователя как владельца.",
        request=NoteSerializer,
        responses={201: NoteSerializer}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Получить заметку по ID",
        description="Возвращает одну заметку по её ID, если она принадлежит текущему пользователю.",
        responses={200: NoteSerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        summary="Обновить заметку полностью",
        description="Полностью обновляет заметку, если она принадлежит текущему пользователю.",
        request=NoteSerializer,
        responses={200: NoteSerializer}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Частично обновить заметку",
        description="Частично обновляет поля заметки (например, только заголовок).",
        request=NoteSerializer,
        responses={200: NoteSerializer}
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(
        summary="Удалить заметку",
        description="Удаляет заметку, если она принадлежит текущему пользователю.",
        responses={204: OpenApiResponse(description="Заметка удалена.")}
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
