<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import Home from './components/home/Home'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">
  @import "~styles/main";
</style>
