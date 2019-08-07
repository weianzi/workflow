<template>
  <div class="container">
    <div
      id="graph"
      class="base"
    />
    <!-- <div id="status" class="base" align="right" style="white-space:nowrap;">
    </div>-->
    <pop
      v-if="isShowPop && selectedCell"
      :handleTogglePop="handleTogglePop"
      :selectedCell="selectedCell"
      :graph="editor.graph"
    />
    <div
      @click="exportXml"
      class="export-btn"
    >导出xml</div>
    <div
      @click="readXml"
      class="read-btn"
    >读取xml</div>

    <div
      @click="delCell"
      class="del-btn"
    >删除选中</div>
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
      selectedCell: null
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
    // const children = document.querySelectorAll('.mxWindow')
    // try {
    //   children.forEach(el => {
    //     parent.removeChild(el)
    //   })
    // } catch (e) {
    //   console.log(e)
    // }
  },
  methods: {
    handleTogglePop(flag) {
      this.isShowPop = flag
    },
    init() {
      const {graph} = this.editor
      //捕获任务节点的鼠标点击事件
      graph.addListener(mxEvent.CLICK, (sender, evt) => {
        var cell = evt.getProperty('cell')

        var model = graph.getModel()
        var value = model.getValue(cell)
        console.log('graph', graph)

        var bounds = graph.getCellBounds(cell)
        //console.log('bounds', bounds)
        var parent = cell.parent;
        var source = cell.getTerminal(true);
        var target = cell.getTerminal(false);
        console.log('parent', parent, source, target)

        var getTooltipForCell = graph.getTooltipForCell(cell)
        //console.log('getTooltipForCell', getTooltipForCell)
        // if(mxUtils.isNode(value)) {
        // }
        //如果是节点
        // if (model.isVertex(cell)) {
        //   var geo = model.getGeometry(cell)
        //   console.log('geo', geo)
        // } else {

        // }


        if (cell) {
          this.handleTogglePop(true)
        }
        this.selectedCell = cell
      })
    },
    exportXml() {
      var encoder = new mxCodec()
      var node = encoder.encode(this.editor.graph.getModel())
      //console.log(mxUtils.getPrettyXml(node))
      mxUtils.popup(mxUtils.getPrettyXml(node), true)
    },
    delCell() {
      if(!this.selectedCell) {
        return
      }
      this.selectedCell.removeFromParent() //删除了此cell
      this.editor.graph.refresh(this.selectedCell) //刷新面板graph，必须写，否则不会看到cell的删除效果
      this.selectedCell = null
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
  .read-btn, .del-btn {
    position: absolute;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
  }
  .read-btn {
    left: 200px;
  }
  .del-btn{
    left: 400px;
  }
}
</style>
