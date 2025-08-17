#!/bin/bash

# 启动自定义服务（gateway和admin-web）
echo "启动自定义服务..."

# 构建并启动gateway和admin-web服务
docker-compose up -d --build gateway admin-web

# 等待服务启动
echo "等待服务启动..."
sleep 10

# 检查服务状态
echo "检查服务状态..."
docker-compose ps gateway admin-web

# 显示服务日志
echo "Gateway服务日志:"
docker-compose logs --tail=20 gateway

echo "Admin Web服务日志:"
docker-compose logs --tail=20 admin-web

echo "服务启动完成！"
echo "Gateway API: http://localhost:3003"
echo "Admin Web: http://localhost:3002"
echo "通过nginx访问:"
echo "  - Gateway API: http://localhost/gateway/"
echo "  - Admin Web: http://localhost/admin/"
