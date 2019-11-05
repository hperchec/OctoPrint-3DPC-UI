<template>
  <transition
    appear
    enter-active-class="animated fadeInRightBig"
    leave-active-class="animated fadeOutRightBig"
  >
    <div id="home_rightbar">

      <div id="home_rightbar_border"></div>

      <div id="home_rightbar_content">

        <div id="home_rightbar_date_container">
          <span>{{ dateData.getDay() }}</span>
          <span>{{ dateData.getMonth() + ' ' + dateData.getYear() }}</span>
        </div>

        <div id="home_rightbar_clock_container">
          <span id="home_rightbar_clock">{{ displayClock }}</span>
        </div>

        <hr id="home_rightbar_topline"/>

      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'HomeRightbar',
  data () {
    return {
      dateData: new Date(),
      clockData: null,
      clockInterval: null
    }
  },
  computed: {
    displayClock: function () {
      return this.clockData
    }
  },
  methods: {
    setClockData: function () {
      let date = new Date()
      let minutes = date.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      this.clockData = date.getHours() + ':' + minutes
    },
    init: function () {
      // Initialize
      this.setClockData()
      // Set time out to 60 seconds
      this.clockInterval = setInterval(this.setClockData, 60000)
    }
  },
  mounted () {
    // Initialize
    this.init()
  }
}
</script>
