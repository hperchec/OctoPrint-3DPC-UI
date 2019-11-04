<template>
  <div id="home_container">

    <HomeBGAnimation></HomeBGAnimation>

    <div id="home_black_ellipse_container">
      <img id="home_black_ellipse" src="../../assets/black_ellipse_fade2.png"/>
    </div>

    <div id="home_canvas_container">
      <canvas id="home_canvas" width="200px" height="200px"></canvas>
    </div>

    <HomeButtons :display="showHomeMenu" :buttons="homeButtons"></HomeButtons>

    <HomeRightbar v-if="showHomeMenu"></HomeRightbar>

    <HomeWindowContainer :display="!showHomeMenu" :windowComponent="windowComponent" :returnToMenu="returnToMenu"></HomeWindowContainer>

  </div>
</template>

<script>
import HomeBGAnimation from './HomeBGAnimation'
import HomeButtons from './HomeButtons'
import HomeRightbar from './HomeRightbar'
import HomeWindowContainer from './HomeWindowContainer'

export default {
  name: 'Home',
  components: {
    HomeBGAnimation,
    HomeButtons,
    HomeRightbar,
    HomeWindowContainer
  },
  data () {
    return {
      showHomeMenu: true,
      homeButtons: [], // Empty array to default
      windowComponent: '' // Default value
    }
  },
  methods: {
    /**
     * Initialiaze buttons
     * @return {void}
     */
    initButtons: function () {
      this.homeButtons = [
        { id: 1, name: 'IMPRIMER', action: () => { this.switchToWindow('WindowPrint') } },
        { id: 2, name: 'IMPRIMANTE', action: () => {} },
        { id: 3, name: 'PARAMETRES', action: () => {} },
        { id: 4, name: 'BUTTON', action: () => {} },
        { id: 5, name: 'BUTTON', action: () => {} },
        { id: 6, name: 'ABOUT', action: () => {} },
        { id: 7, name: 'SWITCH TO OCTOPRINT UI', action: () => { this.switchUi() } }
      ]
    },
    /**
     * Function to switch to specific window
     * @param {string} componentName - Name of the window component
     * @return {void}
     */
    switchToWindow: function (componentName) {
      // Define the window component
      this.windowComponent = componentName
      // Hide buttons and right bar
      setTimeout(() => {
        this.showHomeMenu = false
      }, 400)
    },
    /**
     * Function to hide window and return to menu
     * @return {void}
     */
    returnToMenu: function () {
      setTimeout(() => {
        this.showHomeMenu = true
      }, 400)
    },
    /**
     * Function to switch to OctoPrint default User Interface
     * @return {void}
     */
    switchUi: function () {
      // Scroll to top to prevent some scrollings
      // because container is 'fixed' (see stylesheets)
      window.scrollTo(0, 0)
      // Call const method declared by the plugin
      // (see js/3dpc_ui.js Knockout JS Framework)
      // eslint-disable-next-line
      GET_THREEDPC_UI_SWITCH_BUTTON_VM().switchUi()
    },
    updateCanvas: function (clear = true, size = 100, opacity = 1) {
      let canvas = document.querySelector('#home_canvas').getContext('2d')
      if (clear) {
        canvas.clearRect(0, 0, document.querySelector('#home_canvas').width, document.querySelector('#home_canvas').height)
      }
      let side = 0
      let x = 100
      let y = 100
      canvas.strokeStyle = 'rgba(135, 206, 235, ' + opacity + ')'
      canvas.lineWidth = 6
      canvas.beginPath()
      canvas.lineCap = 'round'
      canvas.moveTo(x + size * Math.cos(0), y + size * Math.sin(0))
      // Draw hexagon
      for (side; side < 7; side++) {
        canvas.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6))
      }
      canvas.stroke()
      canvas.closePath()
    }
  },
  mounted () {
    // Init buttons
    this.initButtons()
    // eslint-disable-next-line
    $(document).ready(() => {
      var size = 0
      var opacity = 0
      this.updateCanvas(true, size, opacity)
      var frame = () => {
        if (size === 100) {
          // clearInterval(interval)
          size = 0
        } else {
          size++
          opacity = size
          this.updateCanvas(true, size, opacity / 100)
          this.updateCanvas(false, 100 - size, opacity)
        }
      }
      // eslint-disable-next-line
      var interval = setInterval(frame, 2)
    })
  }
}
</script>
