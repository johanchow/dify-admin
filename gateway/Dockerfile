# 使用Node.js官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装所有依赖（包括devDependencies，因为构建时需要）
RUN npm ci

# 复制源代码
COPY . .

# 生成Prisma客户端
RUN npx prisma generate

# 构建应用
RUN npm run build

# 删除devDependencies以减小镜像大小
RUN npm prune --production

# 暴露端口
EXPOSE 3003

# 启动应用
CMD ["npm", "run", "start:prod"]
