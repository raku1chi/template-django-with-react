FROM node:22-alpine

WORKDIR /app

# pnpmをインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

# pnpmを使ってパッケージをインストール
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

# pnpmでdevスクリプトを実行
CMD ["pnpm", "run", "dev", "--host"]
