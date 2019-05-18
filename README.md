# admin

> admin frontend ui

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
config
├── dev.env.js //dev环境变量配置
├── index.js // dev和prod环境的一些基本配置
└── prod.env.js // prod环境变量配置
build
├── build.js // npm run build所执行的脚本
├── check-versions.js // 检查npm和node的版本
├── logo.png
├── utils.js // 一些工具方法，主要用于生成cssLoader和styleLoader配置
├── vue-loader.conf.js // vueloader的配置信息
├── webpack.base.conf.js // dev和prod的公共配置
├── webpack.dev.conf.js // dev环境的配置
└── webpack.prod.conf.js // prod环境的配置

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
