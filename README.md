# 滚动的曲谱（开源版）

项目地址：https://www.scrmusic.cn/

## 技术架构

前端框架：vue3

状态管理：pinia

原子css框架：unocss

打包工具：vite

数据库及服务：serverless 知晓云（ 项目中 key 已隐藏，如需使用，请自行创建相关配置

## 秘钥文件相关

运行前在 public/static 中新建 env.js 文件

```bash
// 网站监控秘钥，可忽略不计
const netWatch = {
  id: '',
  ck: '',
}

const BAAS_KEY = '知晓云服务秘钥'

window.netWatch = netWatch
window.BAAS_KEY = BAAS_KEY
```

## 代码分支

newadmin 为可运行分支

## 项目运行及使用

clone 项目之后

pnpm install 进行以来安装（建议使用 pnpm

pnpm run dev 运行项目
