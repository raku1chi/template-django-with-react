import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class HelloApiTests(APITestCase):
    """
    hello_api エンドポイントのテストクラス
    """

    def test_hello_api_returns_success(self):
        """
        hello_api エンドポイントが正常に応答することをテスト
        """
        url = reverse("hello_api")
        response = self.client.get(url)

        # ステータスコードが200であることを確認
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # レスポンスのフォーマットを確認
        data = json.loads(response.content)
        self.assertIn("message", data)
        self.assertEqual(data["message"], "こんにちは")
        self.assertIn("timestamp", data)
        self.assertIn("status", data)
        self.assertEqual(data["status"], "success")
