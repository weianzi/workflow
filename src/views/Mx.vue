<template>
  <div ref="graph_container"></div>
</template>

<script>

export default {
  name: 'mx',
  mounted() {
    this.init()
  },
  methods: {
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

      this.createEditor('editors/config/workfloweditor.xml')
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