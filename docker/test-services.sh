#!/bin/bash

echo "测试自定义服务..."

# 等待服务启动
echo "等待服务启动..."
sleep 15

# 测试Gateway服务
echo "测试Gateway服务 (端口3003)..."
if curl -s http://localhost:3003 > /dev/null; then
    echo "✅ Gateway服务运行正常"
else
    echo "❌ Gateway服务无法访问"
fi

# 测试Admin Web服务
echo "测试Admin Web服务 (端口3002)..."
if curl -s http://localhost:3002 > /dev/null; then
    echo "✅ Admin Web服务运行正常"
else
    echo "❌ Admin Web服务无法访问"
fi

# 测试通过nginx的代理
echo "测试通过nginx的代理..."

echo "测试Gateway代理 (/gateway/)..."
if curl -s http://localhost/gateway/ > /dev/null; then
    echo "✅ Gateway代理正常"
else
    echo "❌ Gateway代理无法访问"
fi

echo "测试Admin Web代理 (/admin/)..."
if curl -s http://localhost/admin/ > /dev/null; then
    echo "✅ Admin Web代理正常"
else
    echo "❌ Admin Web代理无法访问"
fi

echo "测试完成！"
