# Django RestFramework + React テンプレート

このリポジトリは、モダンな SPA 開発のための Django RestFramework + React テンプレートプロジェクトです。

## 構成

このプロジェクトは以下の 3 つの主要部分で構成されています：

- **Backend**: Django + Django REST Framework で構築された API サーバー
- **Frontend**: React + TypeScript + Vite で構築された SPA フロントエンド
- **Shared**: バックエンドとフロントエンドで共有するコード/リソース

## 技術スタック

### バックエンド

- Python 3.13
- Django + Django REST Framework
- PostgreSQL
- Ruff (リンティング、フォーマット)
- MyPy (型チェック)
- Bandit (セキュリティチェック)
- pytest (テスト)

### フロントエンド

- React 19
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui コンポーネント
- Radix UI (アクセシブルな UI コンポーネント)
- React Hook Form

## セットアップ

### 環境構築

1. リポジトリをクローンします：

```sh
git clone https://github.com/yourusername/template-django-with-react.git
cd template-django-with-react
```

2. Docker で環境を起動します：

```sh
docker compose up -d
```

3. バックエンドのマイグレーションを実行します：

```sh
docker compose exec backend uv run manage.py migrate
```

### 開発サーバー

- **バックエンド**: http://localhost:8000
- **フロントエンド**: http://localhost:5173
- **API**: http://localhost:8000/api/

### コマンドリファレンス

#### バックエンド

```sh
# Djangoの管理コマンドを実行
docker compose exec backend uv run manage.py [command]

# テストを実行
docker compose exec backend uv run python -m pytest

# リンティング
docker compose exec backend uv run ruff check .

# フォーマット
docker compose exec backend uv run ruff format .
```

#### フロントエンド

```sh
# 依存関係のインストール
docker compose exec frontend pnpm install

# 開発サーバーの起動
docker compose exec frontend pnpm dev

# ビルド
docker compose exec frontend pnpm build

# リンティング
docker compose exec frontend pnpm lint
```

## CI/CD

このプロジェクトは GitHub Actions を使用して CI を実装しています：

- バックエンドの静的チェック (リンティング、型チェック、セキュリティチェック、テスト)
- バックエンドのビルドとマイグレーションテスト
- フロントエンドの静的チェック (リンティング、型チェック)
- フロントエンドのビルドテスト

また、Dependabotによる依存関係の自動更新も設定されています。

## ライセンス

このプロジェクトは MIT ライセンスの下で提供されています。
