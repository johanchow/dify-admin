# Dify Gateway

基于 NestJS 和 Prisma 的 Dify 应用管理网关服务，提供完整的应用 CRUD 操作接口。

## 技术架构

### 整体架构
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Admin Web     │    │   Gateway       │    │   PostgreSQL    │
│   (React)       │◄──►│   (NestJS)      │◄──►│   Database      │
│   Port: 3000    │    │   Port: 3003    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 技术栈
- **后端框架**: NestJS (Node.js)
- **ORM**: Prisma
- **数据库**: PostgreSQL
- **API 文档**: 自动生成
- **验证**: class-validator
- **序列化**: class-transformer

### 项目结构
```
src/
├── apps/                    # 应用管理模块
│   ├── dto/                # 数据传输对象
│   │   ├── create-app.dto.ts
│   │   └── update-app.dto.ts
│   ├── apps.controller.ts  # 控制器层
│   ├── apps.service.ts     # 服务层
│   └── apps.module.ts      # 模块定义
├── prisma/                 # 数据库配置
│   ├── prisma.service.ts   # Prisma 服务
│   └── prisma.module.ts    # Prisma 模块
├── app.controller.ts       # 根控制器
├── app.service.ts          # 根服务
├── app.module.ts           # 根模块
└── main.ts                 # 应用入口
```

### 分层架构
1. **Controller 层**: 处理 HTTP 请求，参数验证，响应格式化
2. **Service 层**: 业务逻辑处理，数据操作
3. **Repository 层**: 数据访问层 (通过 Prisma)
4. **DTO 层**: 数据传输对象，定义接口契约

## 数据表设计

### App 表 (apps， 跟dify共用)
具体查看[schema.prisma](./prisma/schema.prisma)
应用核心信息表，存储所有应用的基本信息。

```sql
CREATE TABLE apps (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id           UUID NOT NULL,                    -- 租户ID
  name                VARCHAR(255) NOT NULL,            -- 应用名称
  mode                VARCHAR(255) NOT NULL,            -- 应用模式 (chat/completion/workflow)
  icon                VARCHAR(255),                     -- 应用图标
  icon_background     VARCHAR(255),                     -- 图标背景色
  app_model_config_id UUID,                             -- 模型配置ID
  status              VARCHAR(255) DEFAULT 'normal',    -- 应用状态 (normal/disabled/maintenance)
  enable_site         BOOLEAN DEFAULT false,            -- 是否启用网站
  enable_api          BOOLEAN DEFAULT false,            -- 是否启用API
  api_rpm             INTEGER DEFAULT 0,                -- API每分钟请求限制
  api_rph             INTEGER DEFAULT 0,                -- API每小时请求限制
  is_demo             BOOLEAN DEFAULT false,            -- 是否为演示应用
  is_public           BOOLEAN DEFAULT false,            -- 是否为公开应用
  is_universal        BOOLEAN DEFAULT false,            -- 是否为通用应用
  created_at          TIMESTAMP DEFAULT NOW(),          -- 创建时间
  updated_at          TIMESTAMP DEFAULT NOW()           -- 更新时间
);
```

### Workflow 表 (workflows， 跟dify共用)
工作流配置表，存储工作流的详细配置信息。

```sql
CREATE TABLE workflows (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id              UUID NOT NULL,                    -- 租户ID
  app_id                 UUID NOT NULL,                    -- 关联的应用ID
  type                   VARCHAR(255) NOT NULL,            -- 工作流类型
  version                VARCHAR(255) NOT NULL,            -- 版本号
  graph                  TEXT NOT NULL,                    -- 工作流图配置 (JSON)
  features               TEXT NOT NULL,                    -- 功能配置 (JSON)
  created_by             UUID NOT NULL,                    -- 创建者ID
  created_at             TIMESTAMP DEFAULT NOW(),          -- 创建时间
  updated_by             UUID,                             -- 更新者ID
  updated_at             TIMESTAMP DEFAULT NOW(),          -- 更新时间
  environment_variables  TEXT DEFAULT '{}',                -- 环境变量 (JSON)
  conversation_variables TEXT DEFAULT '{}',                -- 对话变量 (JSON)
  marked_name            VARCHAR DEFAULT '',               -- 标记名称
  marked_comment         VARCHAR DEFAULT ''                -- 标记注释
);
```

### 关系设计
- **App ↔ Workflow**: 一对一关系, 来自dify自身设计

## API 接口

### 应用管理接口

| 方法 | 路径 | 描述 | 请求体 |
|------|------|------|--------|
| GET | `/dify/apps` | 获取所有应用列表 | - |
| POST | `/dify/apps` | 创建新应用 | CreateAppDto |
| GET | `/dify/app/:id` | 获取指定应用详情 | - |
| PATCH | `/dify/app/:id` | 更新指定应用 | UpdateAppDto |
| DELETE | `/dify/app/:id` | 删除指定应用 | - |

## 快速开始

### 环境要求
- Node.js >= 18
- PostgreSQL >= 13
- npm >= 8

### 安装依赖
```bash
npm install
```

### 环境配置
创建 `.env` 文件：
```env
# 数据库配置
DATABASE_URL="postgresql://username:password@localhost:5432/dify_gateway?schema=public"

# 应用配置
PORT=3003
NODE_ENV=development
```

### 数据库迁移
```bash
# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init
```

### 启动服务
```bash
# 开发模式
npm run start:dev

# 生产模式
npm run start:prod
```

### 测试接口
```bash
# 获取应用列表
curl http://localhost:3003/dify/apps

# 创建应用
curl -X POST http://localhost:3003/dify/apps \
  -H "Content-Type: application/json" \
  -d '{
    "tenant_id": "9f8d0961-db16-4b75-a673-27f75571e0c4",
    "name": "测试应用",
    "mode": "chat",
    "icon": "🤖",
    "icon_background": "#FFEAD5"
  }'
```

## 部署

### Docker 部署
```bash
# 构建镜像
docker build -t dify-gateway .

# 运行容器
docker run -p 3003:3003 dify-gateway
```
