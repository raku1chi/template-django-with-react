from datetime import datetime

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """
    TodoモデルのCRUD操作を行うViewSet
    """

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


@api_view(["GET"])
def hello_api(request):
    """
    サンプルのAPIエンドポイント
    """
    return Response(
        {
            "message": "こんにちは",
            "timestamp": datetime.now().isoformat(),
            "status": "success",
        }
    )
