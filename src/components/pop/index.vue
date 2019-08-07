<template>
  <div class="mxWindow mxWindow-dialog">
    <div class="mxWindowTitle">
      属性
      <div class="btn-group">
        <img
          src="/static/src/images/close.gif"
          title="Close"
          @click="handleTogglePop(false)"
        />
      </div>
    </div>
    <div class="mxWindowPane">
      <!-- <el-scrollbar>
        <el-form
          :model="cellData"
          class="search-form"
          :label-position="'left'"
        >
          <el-form-item>
            <el-col style="width:2.7rem;">
              <el-form-item
                label="年份"
                :label-width="'0.5rem'"
              >
                <el-input v-model="cellData.age" clearable />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </el-scrollbar> -->
      <div
        v-for="item in cellData"
        :key="item.name"
      >
        {{item.name}}:
        <input
          type="text"
          :value="item.value"
          @change="handleInputChange($event, item.name)"
          :disabled="item.name == 'id'"
        />
      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: ['graph', 'handleTogglePop', 'selectedCell'],
  data() {
    return {
      cellData: []
    }
  },
  watch: {
    selectedCell: {
      handler(obj) {
        this.cellData = this.handleCellData(obj)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    var dialog = document.querySelector('.mxWindow-dialog')
    var mxWindowTitle = document.querySelector(
      '.mxWindow-dialog .mxWindowTitle'
    )
    this.dragBox(mxWindowTitle, dialog)
  },
  methods: {
    handleInputChange(ev, name) {
      const value = ev.target.value
      console.log(value, name)
      this.selectedCell.setAttribute(name, value)
      this.graph.refresh(this.selectedCell) //刷新面板graph，必须写，否则不会看到cell的删除效果
    },
    handleCellData(cell) {
      const arr = []
      //const obj = {}
      if (cell) {
        const model = this.graph.getModel()
        //height width top left
        const bounds = this.graph.getCellBounds(cell)
        const source = cell.getTerminal(true) //from
        const target = cell.getTerminal(false) //to
        console.log('from to: ', source && source.id, target && target.id, bounds)
        //如果是节点
        if (model.isVertex(cell)) {
        } else {

        }
        //cell.setAttribute('age', 28)

        const attrs = cell.value.attributes
        const arr = [{ name: 'id', value: cell.id }]
        //obj.id = cell.id
        for (let i = 0; i < attrs.length; i++) {
          arr.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue })
          //obj[attrs[i].nodeName] = attrs[i].nodeValue
        }
        return arr
        //return obj
      }
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
<style lang="scss">
.mxWindow-dialog {
  position: relative;
  right: 20px;
  top: 20px;
  width: 400px;
  height: 400px;
  z-index: 2;
  .mxWindowTitle {
    background: url('/static/src/images/window-title.gif') repeat-x;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    font-weight: bold;
    overflow: hidden;
    height: 23px;
    padding: 2px;
    padding-top: 4px;
    padding-bottom: 6px;
    color: black;
    font-size: 12px;
    cursor: move;
    .btn-group {
      position: absolute;
      display: inline-block;
      right: 4px;
      top: 5px;
      img {
        margin-right: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>
