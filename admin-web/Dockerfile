# 使用Node.js官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 安装serve来提供静态文件服务
RUN npm install -g serve

# 暴露端口
EXPOSE 3002

# 启动应用
CMD ["serve", "-s", "build", "-l", "3002"]
