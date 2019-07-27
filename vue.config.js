const path = require('path')

let target = 'http://xxx.xxx.com' //开发环境

//npm run mock
if (process.env.VUE_APP_ENV == 'mock') {
  target = 'http://localhost:5000'
}

const config = {
  assetsDir: './static',
  outputDir: path.resolve(__dirname, './dist/'),
  indexPath: path.resolve(__dirname, './dist/index.html'),
  publicPath: process.env.NODE_ENV == 'production' ? '/www' : '', //打包时，html引入资源以/www开头
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        //data: '@import "./blueDeep/css/mixin.scss";'
      }
    }
  },
  devServer: {
    port: 8077,
    open: true, //浏览器打开网页
    proxy: {
      '/api': {
        target: target,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('')
      .test(/mxClient\.js$/)
      .use('exports-loader')
      .loader(
        'exports-loader?mxClient,mxGraphModel,mxActor,mxShape,mxEventObject,mxGraph,mxPrintPreview,mxEventSource,mxRectangle,mxVertexHandler,mxMouseEvent,mxGraphView,mxImage,mxGeometry,mxRubberband,mxKeyHandler,mxDragSource,mxGraphModel,mxEvent,mxUtils,mxWindow,mxEvent,mxCodec,mxCell,mxConstants,mxPoint,mxGraphHandler,mxCylinder,mxCellRenderer,mxEvent,mxUndoManager'
      )
      .end()
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
    // 按这种格式.set('', resolve('')) 自己添加
  }
}


function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = config
