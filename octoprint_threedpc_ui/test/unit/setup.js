import Vue from 'vue'
import jQuery from 'jquery'
import BootstrapVue from 'bootstrap-vue'
// Directives
import Ripple from 'vue-ripple-directive'

// Plugins utilisation
Vue.use(BootstrapVue)

window.$ = jQuery

// Directives activation
// Ripple.color = 'rgba(255, 255, 255, 0.35)' // Define global color for ripple
Ripple.color = 'rgba(135, 206, 235, 1)' // Define global color for ripple
Vue.directive('ripple', Ripple)

Vue.config.productionTip = false