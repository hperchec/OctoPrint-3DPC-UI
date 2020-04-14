<template>
  <b-button
    v-ripple
    variant="secondary"
    @click="click()"
    class="home_button"
  >
    <slot></slot>
  </b-button>
</template>

<script>
// Declare outside the component
/**
 * Default click function
 * @return {boolean} Return true
 */
const defaultClick = () => {
  return true
}
// Export Vue Component
export default {
  name: 'HomeButton',
  props: {
    /**
     * Callback function to call on click on the button
     */
    click: {
      type: Function,
      default () {
        return defaultClick
      }
    }
  },
  data () {
    return {}
  }
}
</script>
