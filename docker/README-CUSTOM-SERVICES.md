# 自定义服务说明

## 新增服务

### 1. Gateway服务 (NestJS)
- **端口**: 3003
- **依赖**: 需要数据库(db)先启动
- **功能**: 提供API网关服务
- **访问地址**: 
  - 直接访问: http://localhost:3003
  - 通过nginx: http://localhost/gateway/

### 2. Admin Web服务 (React)
- **端口**: 3002
- **依赖**: 需要gateway服务先启动
- **功能**: 提供管理后台Web界面
- **访问地址**:
  - 直接访问: http://localhost:3002
  - 通过nginx: http://localhost/admin/

## 启动方式

### 方式1: 启动所有服务
```bash
docker-compose up -d
```

### 方式2: 只启动自定义服务
```bash
# 启动gateway和admin-web
docker-compose up -d --build gateway admin-web

# 或者使用提供的脚本
./start-custom-services.sh
```

### 方式3: 按顺序启动
```bash
# 1. 先启动数据库
docker-compose up -d db

# 2. 启动gateway
docker-compose up -d --build gateway

# 3. 启动admin-web
docker-compose up -d --build admin-web
```

## 服务依赖关系

```
db (数据库)
  ↓
gateway (API网关)
  ↓
admin-web (管理后台)
```

## 环境变量

### Gateway服务
- `DATABASE_URL`: 数据库连接字符串
- `NODE_ENV`: 运行环境 (production/development)
- `PORT`: 服务端口 (默认3003)

### Admin Web服务
- `REACT_APP_API_URL`: API服务地址 (指向gateway)
- `PORT`: 服务端口 (默认3002)

## 日志查看

```bash
# 查看gateway日志
docker-compose logs -f gateway

# 查看admin-web日志
docker-compose logs -f admin-web

# 查看所有服务日志
docker-compose logs -f
```

## 故障排除

### 1. 构建失败
```bash
# 清理并重新构建
docker-compose down
docker-compose build --no-cache gateway admin-web
docker-compose up -d gateway admin-web
```

### 2. 端口冲突
如果3002或3003端口被占用，可以修改docker-compose.yaml中的端口映射：
```yaml
ports:
  - "3004:3003"  # 改为其他端口
```

### 3. 数据库连接问题
确保数据库服务正常运行：
```bash
docker-compose ps db
docker-compose logs db
```

## 开发模式

### Gateway开发
```bash
# 进入gateway容器
docker-compose exec gateway sh

# 在容器内运行开发模式
npm run start:dev
```

### Admin Web开发
```bash
# 进入admin-web容器
docker-compose exec admin-web sh

# 在容器内运行开发模式
npm start
```
