/*
 * Copyright (c) 2006-2013, JGraph Ltd
 *
 * Defines the startup sequence of the application.
 */
{
  /**
   * Constructs a new application (returns an mxEditor instance)
   */
  function createEditor(config) {
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
        mxObjectCodec.allowEval = true
        var node = mxUtils.load(config).getDocumentElement()
        //console.log(node)
        editor = new mxEditor(node)
        var graph = editor.graph

        mxObjectCodec.allowEval = false

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

        //捕获任务节点的鼠标点击事件
        graph.addListener(mxEvent.CLICK, function(sender, evt) {
          var cell = evt.getProperty('cell')
          var nodeId = cell ? cell.id : null
          console.log(sender, evt, cell, nodeId)
          //if (nodeId.length > 0) {
          //  self.clickCell(self.graphId, nodeId)
          //}
        })

        var dialog = document.querySelector('.mxWindow-dialog')
        var mxWindowTitle = document.querySelector('.mxWindow-dialog .mxWindowTitle')
        dragBox(mxWindowTitle, dialog)
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


var dragBox = function(drag, wrap) {
  function getCss(ele, prop) {
    return parseInt(window.getComputedStyle(ele)[prop])
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
