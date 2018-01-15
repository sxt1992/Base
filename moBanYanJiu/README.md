# moBanYanJiu

> jiao shou jia

## 项目简介

### 1. 如何访问

// TODO

### 2. 项目文档、设计稿

// TODO

### 3. 项目文件结构

// TODO

## 初始化项目

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
# remember to set local.souche.com: 127.0.0.1 to your hosts.
npm run local

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 发布

> 默认是将 Makefile 同级目录 dist 文件夹下的所有文件发布到服务器上指定目录

```bash
# 前置依赖安装sw命令
npm install -g @souche-f2e/souche-publish --registry=http://registry.npm.souche-inc.com

# 发布到测试环境
# dev 为发布到环境，可选值：dev, dev1, dev2, dev3, dev4, devqa, devqb, prepub, online
npm run build # 选择dev
sw publish dev

# 预发
npm run build # 选择prepub
sw publish prepub

# 线上
npm run build # 选择prod
sw publish prod

# 更多命令
sw help
```
