<template>
  <div class="container">
    <table
      id="splash"
      width="100%"
      height="100%"
      style="background:white;position:absolute;top:0px;left:0px;z-index:4;"
    >
      <tr>
        <td
          align="center"
          valign="middle"
        >
          <img src="static/examples/editors/images/loading.gif" />
        </td>
      </tr>
    </table>
    <div
      id="graph"
      class="base"
    ></div>
    <!-- <div id="status" class="base" align="right" style="white-space:nowrap;">
    </div>-->

    <div
      class="mxWindow mxWindow-dialog"
      style="left: 812px; top: 91px; width: 200px; z-index: 2;"
    >
      <table
        class="mxWindow"
        style="width: 200px;"
      >
        <tbody>
          <tr>
            <td
              class="mxWindowTitle"
              style="cursor: move;"
            >
              <!-- <img
                src="images/tasks.gif"
                align="left"
                style="margin-right: 4px; margin-left: 0px; margin-top: -2px;"
              />XXXXXXXXX -->
              <div style="position: absolute; display: inline-block; right: 4px; top: 5px;">
                <!-- <img
                  src="../../src/images/maximize.gif"
                  title="Maximize"
                  style="cursor: pointer; margin-left: 2px; display: none;"
                /><img
                  src="../../src/images/minimize.gif"
                  title="Minimize"
                  style="cursor: pointer; margin-left: 2px;"
                /><img
                  src="../../src/images/close.gif"
                  title="Close"
                  style="margin-left: 2px; cursor: pointer;"
                /> -->
              </div>
            </td>
          </tr>
          <tr>
            <td class="mxWindowPane">
              <div
                class="mxWindowPane"
                style="width: 100%;"
              >
                <div style="padding: 4px 4px 4px 20px;">
                  <p>111212324231434242443</p>
                  <span style="color: blue; text-decoration: underline; cursor: pointer; padding-left: 30px;">New Diagram</span><br /><span style="color: blue; text-decoration: underline; cursor: pointer; padding-left: 30px;">Swimlanes</span><br /><span style="color: blue; text-decoration: underline; cursor: pointer; padding-left: 30px;">Travel Booking</span><br />
                  <p>Selection</p>
                  <span style="color: blue; text-decoration: underline; cursor: pointer; padding-left: 30px;">Select All</span><br /><br />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workflow',
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = createEditor(
      'static/examples/editors/config/workfloweditor.xml'
    )

    this.init()
  },
  beforeDestroy() {
    this.editor && this.editor.destroy && this.editor.destroy()
    this.editor = null
    const parent = document.querySelector('body')
    const children = document.querySelectorAll('.mxWindow')
    try {
      children.forEach(el => {
        parent.removeChild(el)
      })
    } catch (e) {
      // console.log(e)
    }
  },
  methods: {
    init() {
      //捕获任务节点的鼠标点击事件
      this.editor.graph.addListener(mxEvent.CLICK, (sender, evt) => {
        var cell = evt.getProperty('cell')
        var nodeId = cell ? cell.id : null
        console.log(cell, nodeId)
        //if (nodeId.length > 0) {
        //  self.clickCell(self.graphId, nodeId)
        //}
      })

      var dialog = document.querySelector('.mxWindow-dialog')
      var mxWindowTitle = document.querySelector(
        '.mxWindow-dialog .mxWindowTitle'
      )
      this.dragBox(mxWindowTitle, dialog)
    },
    dragBox(drag, wrap) {
      function getCss(ele, prop) {
        return parseInt(getComputedStyle(ele)[prop])
      }

      var initX,
        initY,
        dragable = false,
        wrapLeft = getCss(wrap, 'left'),
        wrapRight = getCss(wrap, 'top')

      drag.addEventListener(
        'mousedown',
        function(e) {
          dragable = true
          initX = e.clientX
          initY = e.clientY
        },
        false
      )

      document.addEventListener('mousemove', function(e) {
        if (dragable === true) {
          var nowX = e.clientX,
            nowY = e.clientY,
            disX = nowX - initX,
            disY = nowY - initY
          wrap.style.left = wrapLeft + disX + 'px'
          wrap.style.top = wrapRight + disY + 'px'
        }
      })

      drag.addEventListener(
        'mouseup',
        function(e) {
          dragable = false
          wrapLeft = getCss(wrap, 'left')
          wrapRight = getCss(wrap, 'top')
        },
        false
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.base {
  position: absolute;
  overflow: hidden;
  font-family: Arial;
  font-size: 8pt;
}
#graph {
  border-style: solid;
  border-color: #f2f2f2;
  border-width: 1px;
  background: url('/static/examples/editors/images/grid.gif') #fff;
}
.container {
  width: 100%;
  min-height: 100%;
  position: relative;
}
</style>
