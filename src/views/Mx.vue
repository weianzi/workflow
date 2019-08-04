<template>
  <div id="splash" ref="graph_container"></div>
</template>

<script>
// import {
//   mxGraph,
//   mxRubberband,
//   mxClient,
//   mxCell,
//   mxGraphModel,
//   mxRectangle,
//   mxUtils,
//   mxUndoManager,
//   mxFastOrganicLayout,
//   mxPoint,
//   mxEvent,
//   mxStencil,
//   mxEdgeStyle,
//   mxCodec,
//   mxEditor,
//   mxKeyHandler,
//   mxForm,
//   mxConstants,
//   mxPerimeter,
//   mxImage,
//   mxConnectionHandler,
//   mxGeometry,
//   mxEventSource,
//   mxToolbar,
//   mxGraphHandler
// } from 'mxgraph/javascript/mxClient'

export default {
  name: 'mx',
  mounted() {
    //this.init()
    var splash = document.getElementById('splash')
    this.main(splash)
  },
  methods: {
    main(container) {
      // 判断浏览器是否支持
      if (!mxClient.isBrowserSupported()) {
        // mxUtils报错提示
        mxUtils.error('Browser is not supported!', 200, false)
      } else {
        //去锯齿效果
        mxRectangleShape.prototype.crisp = true
        // 显示导航线
        mxGraphHandler.prototype.guidesEnabled = true
        // Alt键禁用导航线
        mxGuide.prototype.isEnabledForEvent = function(evt) {
          return !mxEvent.isAltDown(evt)
        }
        // 显示终点
        mxEdgeHandler.prototype.snapToTerminals = false
        // 禁用浏览器默认的右键菜单栏
        mxEvent.disableContextMenu(container)

        // 在已有容器内构造一个graph
        var graph = new mxGraph(container)
        // 鼠标框选
        new mxRubberband(graph)
        // 在图形中创建默认组件
        var parent = graph.getDefaultParent()
        // 只可预览不可选中拖动连接
        graph.setEnabled(false)
        // 容器大小自适应
        graph.setResizeContainer(true)
        // 动态改变样式
        graph.getView().updateStyle = true
        // 可否重复连接
        graph.setMultigraph(false)
        // 禁止改变元素大小
        graph.setCellsResizable(false)
        // 允许连线的目标和源是同一元素
        graph.setAllowLoops(true)

        // 开始往module里添加cell
        graph.getModel().beginUpdate()
        try {
          //new一个cell   以单元的形式创建一个节点
          var cell = new mxCell(
            null,
            new mxGeometry(100, 200, 100, 100),
            '一些样式配置'
          )
          cell.vertex = true
          //插入这个cell
          graph.addCell(cell)

          var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30)
          var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30)
          //插入线条设置连接图形
          var e1 = graph.insertEdge(parent, null, '', v2, v2)

          //预览时鼠标悬浮到节点时，改变鼠标样式
          graph.getCursorForCell = function(cell) {
            if (cell != null && cell.value != null && cell.vertex == 1) {
              return 'pointer'
            }
          }
        } finally {
          // 更新事务结束
          graph.getModel().endUpdate()
        }
      }
    },
    init() {
      mxGraph.prototype.htmlLabels = true
      mxGraph.prototype.isWrapping = function(cell) {
        return true
      }
      mxConstants.DEFAULT_HOTSPOT = 1
      // Enables guides
      mxGraphHandler.prototype.guidesEnabled = true
      // Alt disables guides
      //   mxGuide.prototype.isEnabledForEvent = function(evt) {
      //     return !mxEvent.isAltDown(evt)
      //   }
      // Enables snapping waypoints to terminals
      // mxEdgeHandler.prototype.snapToTerminals = true

      this.createEditor(
        '/javascript/examples/editors/config/workfloweditor.xml'
      )
    },
    createEditor(config) {
      //console.log(config, mxUtils.load)
      var editor = null

      var hideSplash = function() {
        // Fades-out the splash screen
        var splash = document.getElementById('splash')

        if (splash != null) {
          try {
            mxEvent.release(splash)
            mxEffects.fadeOut(splash, 100, true)
          } catch (e) {
            splash.parentNode.removeChild(splash)
          }
        }
      }

      try {
        if (!mxClient.isBrowserSupported()) {
          mxUtils.error('Browser is not supported!', 200, false)
        } else {
          //mxObjectCodec.allowEval = true
          //debugger
          // const c = require(config)
          var node = mxUtils.load(config).getDocumentElement()
          console.log(node)
          editor = new mxEditor(node)
          //mxObjectCodec.allowEval = false

          // Adds active border for panning inside the container
          editor.graph.createPanningManager = function() {
            var pm = new mxPanningManager(this)
            pm.border = 30

            return pm
          }

          editor.graph.allowAutoPanning = true
          editor.graph.timerAutoScroll = true

          // Updates the window title after opening new files
          var title = document.title
          var funct = function(sender) {
            document.title = title + ' - ' + sender.getTitle()
          }

          editor.addListener(mxEvent.OPEN, funct)

          // Prints the current root in the window title if the
          // current root of the graph changes (drilling).
          editor.addListener(mxEvent.ROOT, funct)
          funct(editor)

          // Displays version in statusbar
          editor.setStatus('mxGraph ' + mxClient.VERSION)

          // Shows the application
          hideSplash()
        }
      } catch (e) {
        hideSplash()

        // Shows an error message if the editor cannot start
        mxUtils.alert('Cannot start application: ' + e.message)
        throw e // for debugging
      }

      return editor
    }
  }
}
</script>