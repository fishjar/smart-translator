FROM node:alpine

# 将工作目录设置为 /app
WORKDIR /app

# 将当前目录内容复制到位于 /app 中的容器中
ADD . /app

# 安装依赖包
# RUN npm install --registry=https://registry.npm.taobao.org
RUN npm install
# RUN yarn

# 编译
RUN npm run build
# RUN yarn build

# 使端口 4000 可供此容器外的环境使用
EXPOSE 4000

# 定义环境变量
# 启动命令指定，这里就不用了
# ENV NODE_ENV production

# 在容器启动时运行
CMD [ "npm", "start" ]
# CMD [ "yarn", "start" ]
