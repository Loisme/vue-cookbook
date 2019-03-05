// see http://vuejs-templates.github.io/webpack for documentation.
let path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 9090, // 默认端口
    autoOpenBrowser: true, // 自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: { // 代理请求设置
      '/meishi': { // 代理名字
        target: 'http://api.360meishi.net', // 通过本地服务器将你的请求转发到这个地址
        changeOrigin: true, // 跨域访问设置，true代表跨域
        pathRewrite: { // 路径改写规则
          '^/meishi': '' // 以/meishi为开头的改写为''
        },
      }
    },

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
