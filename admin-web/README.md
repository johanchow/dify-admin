# Dify 机器人管理系统

这是一个基于 React + TypeScript 的 Dify 机器人管理系统，用于管理和操作 Dify 机器人。

## 功能特性

- 🚀 **机器人列表展示** - 以卡片形式展示所有机器人信息
- ✏️ **机器人编辑** - 支持编辑机器人基本信息
- ➕ **创建机器人** - 创建新的机器人
- 🗑️ **删除机器人** - 删除不需要的机器人
- 🔄 **状态切换** - 启用/停用机器人
- 📱 **响应式设计** - 支持移动端和桌面端
- 🎨 **现代化UI** - 美观的用户界面

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Axios** - HTTP 请求库
- **CSS3** - 样式设计

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── BotList.tsx     # 机器人列表组件
│   ├── BotList.css     # 列表样式
│   ├── BotForm.tsx     # 机器人表单组件
│   └── BotForm.css     # 表单样式
├── services/           # 服务层
│   └── api.ts         # API 服务
├── types/             # 类型定义
│   └── dify.ts        # Dify 相关类型
├── data/              # 数据层
│   └── mockData.ts    # Mock 数据
├── App.tsx            # 主应用组件
├── App.css            # 主应用样式
└── index.tsx          # 应用入口
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
npm run build
```

## 功能说明

### 机器人信息

每个机器人包含以下信息：
- **名称** - 机器人名称
- **描述** - 机器人功能描述
- **状态** - 运行中/已停用/维护中
- **模型** - 使用的AI模型
- **分类** - 机器人分类
- **最大Token数** - 单次对话最大token数
- **温度** - AI模型温度参数
- **标签** - 自定义标签
- **创建时间** - 创建时间
- **更新时间** - 最后更新时间

### 操作功能

1. **查看列表** - 首页显示所有机器人
2. **创建机器人** - 点击"创建机器人"按钮
3. **编辑机器人** - 点击机器人卡片上的"编辑"按钮
4. **删除机器人** - 点击"删除"按钮（需要确认）
5. **切换状态** - 点击"启用/停用"按钮

## Mock 数据

当前使用 Mock 数据模拟 API 响应，包含5个示例机器人：
- 客服助手
- 代码助手
- 翻译助手
- 数据分析师
- 营销文案助手

## API 接口

项目已准备好与真实 API 集成，只需在 `src/services/api.ts` 中取消注释相关代码即可。

### 主要接口

- `GET /bots` - 获取机器人列表
- `GET /bots/:id` - 获取机器人详情
- `POST /bots` - 创建机器人
- `PUT /bots/:id` - 更新机器人
- `DELETE /bots/:id` - 删除机器人
- `PATCH /bots/:id/status` - 切换机器人状态

## 开发说明

### 添加新功能

1. 在 `src/types/dify.ts` 中定义相关类型
2. 在 `src/services/api.ts` 中添加 API 方法
3. 在 `src/components/` 中创建新组件
4. 在 `src/data/mockData.ts` 中添加测试数据

### 样式定制

- 主样式：`src/App.css`
- 列表样式：`src/components/BotList.css`
- 表单样式：`src/components/BotForm.css`

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
