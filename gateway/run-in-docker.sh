#!/bin/bash

# 在 Docker 网络中运行 Gateway 服务

echo "🐳 在 Docker 网络中启动 Gateway 服务..."

# 停止并删除现有容器
docker stop dify-gateway-dev 2>/dev/null || true
docker rm dify-gateway-dev 2>/dev/null || true

# 运行 gateway 服务
docker run -d --name dify-gateway-dev --network docker_default -p 3001:3001 -v "$(pwd):/app" -w /app -e DB_HOST=db -e DB_PORT=5432 -e DB_USERNAME=postgres -e DB_PASSWORD=difyai123456 -e DB_DATABASE=dify_gateway -e DB_CHARSET=utf8 -e DB_EXTRAS=keepalives_idle=60&keepalives=1 -e PORT=3001 -e NODE_ENV=development node:18-alpine sh -c "npm install && npm run start:dev"

echo "✅ Gateway 服务已启动"
echo "📋 服务信息:"
echo "   - 容器名: dify-gateway-dev"
echo "   - 端口: http://localhost:3001"
echo "   - 网络: docker_default"
echo ""
echo "🔍 查看日志: docker logs -f dify-gateway-dev"
echo "🛑 停止服务: docker stop dify-gateway-dev"
