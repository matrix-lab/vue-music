# vue-music

> 音乐播放器

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
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 推荐页
	babel-runtime // 对ES6语法进行转义 
	babel-polyfill // 对ES6的API进行转义 （eg: Promise）
	fastclick 解决移动端click事件300ms延迟	 

## 使用jsonp抓取轮播图组件
	better-scroll 解决移动端（已支持 PC）各种滚动场景需求的插件 
	vue-lazyload vue图片懒加载插件

	base文件夹为基础组件库
	components文件夹为业务组件库

## 热门歌单接口配置 
	由于直接引用qq接口时host和referer的限制，使用ajax库--axios
	webpack.dev.conf.js + recommend.js 配置

## vuex 文件设置顺序
	首先定义state -> getters -> mutation-types -> mutations
