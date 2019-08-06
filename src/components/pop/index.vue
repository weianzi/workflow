<template>
  <div class="mxWindow mxWindow-dialog">
    <table class="mxWindow">
      <tbody>
        <tr>
          <td class="mxWindowTitle">
            属性
            <div class="btn-group">
              <img
                src="/static/src/images/close.gif"
                title="Close"
                @click="handleTogglePop(false)"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="mxWindowPane">
            <div
              class="mxWindowPane"
              style="width: 100%;"
            >
              <div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['handleTogglePop'],
  mounted() {
    var dialog = document.querySelector('.mxWindow-dialog')
    var mxWindowTitle = document.querySelector(
      '.mxWindow-dialog .mxWindowTitle'
    )
    this.dragBox(mxWindowTitle, dialog)
  },
  methods: {
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
  right: 20px;
  top: 20px;
  width: 400px;
  height: 400px;
  z-index: 2;
  .mxWindow {
    width: 400px;
    height: 400px;
    .mxWindowTitle {
      height: 23px;
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
}
</style>
