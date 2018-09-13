# studyWebpack
根据https://blog.csdn.net/xyphf/article/details/79823197以及掘金小册《使用 webpack 定制前端开发环境》以及https://godbmw.com/passage/37学习webpack

##### 需要记住的点
1. 提取公共代码：
> example
```javascript
optimization: {
    splitChunks: {
      minSize: 1,
      minChunks: 2, // 引用的最少次数
      chunks: 'all',
      cacheGroups: {
        common: {
          name: 'common',
          priority: 0 // 打包优先级
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        }
      }
    }
  },
```
2. 插件
* 提供html模板
> html-webpack-plugin
