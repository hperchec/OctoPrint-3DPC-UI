<template>
  <div id="home_buttons_container">

    <!--
      7 available button containers by default
      identified by 'home_button_container_<id>'
      where <id> is an integer from 1 to 7
    -->

    <!-- Each button is in a transition container -->

    <transition
      v-for="button in buttons" :key="button.id"
      appear
      :enter-active-class="'animated fadeInLeftBig delay-' + (100 * button.id) + 'ms'"
      :leave-active-class="'animated fadeOutLeftBig delay-' + (100 * button.id) + 'ms'"
    >
      <div v-if="display" :class="'home_button_container home_button_container_' + button.id">
        <home-button :click="button.action">{{ button.name }}</home-button>
      </div>
    </transition>

  </div>
</template>

<script>
import HomeButton from './HomeButton'
export default {
  name: 'HomeButtons',
  components: {
    HomeButton
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
     * Contains the buttons to display (limited to 7)
     */
    buttons: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  watch: {
    display: function (to, from) {
      console.log('Display : ', this.display)
    }
  }
}
</script>
