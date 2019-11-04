<template>
  <div id="home_window_container">

    <transition
      appear
      enter-active-class="animated fadeInLeftBig"
      leave-active-class="animated fadeOutLeftBig"
    >
        <!-- Return button -->
        <div v-if="display" v-ripple id="home_window_container_return_button" @click="returnToMenu"><span>&#9700;</span></div>
    </transition>

    <transition
      appear
      enter-active-class="animated fadeInDownBig"
      leave-active-class="animated fadeOutDownBig"
    >
        <!-- Styled borders-->
        <div v-if="display" id="home_window_container_border"></div>
    </transition>

    <transition
      appear
      enter-active-class="animated fadeInRightBig"
      leave-active-class="animated fadeOutRightBig"
    >
      <!-- Content -->
      <div v-if="display" id="home_window_content">
        <component v-bind:is="windowComponent" ></component>
      </div>
    </transition>

  </div>
</template>

<script>
import WindowAbout from '../windows/about/About'
import WindowPrint from '../windows/print/Print'
import WindowSettings from '../windows/settings/Settings'

export default {
  name: 'HomeWindowContainer',
  components: {
    WindowAbout,
    WindowPrint,
    WindowSettings
  },
  props: {
    /**
     * Define if buttons must be displayed
     */
    display: {
      type: Boolean,
      default () {
        return true
      }
    },
    /**
     * WIndow component name
     */
    windowComponent: {
      type: String,
      default: null
    },
    /**
     * To pass a 'returnToMenu' function to the window components
     */
    returnToMenu: {
      type: Function,
      default () {
        console.log('Default \'returnToMenu\' function. Does nothing...')
        return true
      }
    }
  },
  data () {
    return {}
  },
  watch: {
    display: function (to, from) {
      if (to) {
        this.$el.style.display = 'block'
      } else {
        setTimeout(() => {
          this.$el.style.display = 'none'
        }, 1000)
      }
    }
  },
  mounted () {
    this.$el.style.display = 'none'
  }
}
</script>
