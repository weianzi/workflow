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
      <div class="mxWindowPane">
        <div
          v-for="item in cellData"
          :key="item.name"
        >
          {{item.name}}: {{item.value}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['handleTogglePop', 'selectedCell'],
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
    handleCellData(cell) {
      const arr = []
      if (cell) {
       console.log(1)
        cell.setAttribute('姓名', 'XXX')
        cell.setAttribute('年龄', 'XXX')
        const attrs = cell.value.attributes
        const arr = [{ name: 'id', value: cell.id }]
        for (let i = 0; i < attrs.length; i++) {
          arr.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue })
        }
        return arr
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
