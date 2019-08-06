<template>
  <div class="container">
    <div
      id="graph"
      class="base"
    />
    <!-- <div id="status" class="base" align="right" style="white-space:nowrap;">
    </div>-->
    <pop
      v-if="isShowPop"
      :handleTogglePop="handleTogglePop"
      :selectedCell="selectedCell"
    />
    <div
      @click="exportXml"
      class="export-btn"
    >导出xml</div>
    <div
      @click="readXml"
      class="read-btn"
    >读取xml</div>
  </div>
</template>

<script>
export default {
  name: 'workflow',
  components: {
    Pop: () => import('@/components/pop')
  },
  data() {
    return {
      isShowPop: false,
      editor: null,
      selectedCell: null,
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
      console.log(e)
    }
  },
  methods: {
    handleTogglePop(flag) {
      this.isShowPop = flag
    },
    init() {
      //捕获任务节点的鼠标点击事件
      this.editor.graph.addListener(mxEvent.CLICK, (sender, evt) => {
        var cell = evt.getProperty('cell')
        var id = cell ? cell.id : null
        // console.log(cell.value.attributes, id)
        if (cell) {
          // var attrs = cell.value.attributes
          // const obj = {id}
          // for (var i = 0; i < attrs.length; i++) {
          //   obj[attrs[i].nodeName] = attrs[i].nodeValue
          // }
           console.log(cell)

          this.handleTogglePop(true)
          this.selectedCell = cell
        }
      })
    },
    exportXml() {
      var encoder = new mxCodec()
      var node = encoder.encode(this.editor.graph.getModel())
      //console.log(mxUtils.getPrettyXml(node))
      mxUtils.popup(mxUtils.getPrettyXml(node), true)
    },

    readXml() {
      var req = mxUtils.load('test.xml')
      var root = req.getDocumentElement()
      //console.log(req, root)
      var dec = new mxCodec(root.ownerDocument)
      dec.decode(root, this.editor.graph.getModel())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100%;
  position: relative;
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

  .export-btn,
  .read-btn {
    position: absolute;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
  }
  .read-btn {
    left: 200px;
  }
}
</style>
