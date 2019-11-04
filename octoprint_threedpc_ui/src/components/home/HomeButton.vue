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
export default {
  name: 'HomeButton',
  props: {
    /**
     * Callback function to call on click on the button
     */
    click: {
      type: Function,
      default () {
        return this.defaultClick
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    /**
     * Default click function
     * @return {boolean} Return true
     */
    defaultClick: () => {
      return true
    }
  }
}
</script>
