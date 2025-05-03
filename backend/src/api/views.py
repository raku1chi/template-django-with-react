from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime


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

