// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Dependencies
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
// eslint-disable-next-line
import $ from 'jquery'
// Directives
import Ripple from 'vue-ripple-directive'
// Components
import App from './App'

// Plugins utilisation
Vue.use(BootstrapVue)

// Directives activation
// Ripple.color = 'rgba(255, 255, 255, 0.35)' // Define global color for ripple
Ripple.color = 'rgba(135, 206, 235, 1)' // Define global color for ripple
Vue.directive('ripple', Ripple)

// Hide production message in the web browser console
Vue.config.productionTip = false

// Apply our custom 'threedpc_ui' and 'threedpc_ui_theme' classes to <html> element
// to bypass other plugins/stylesheets in the context of
// the 3DPC User Interface
var htmlDOMElement = document.getElementsByTagName('html')[0] // '0' to assign the first (and only `HTML` tag)
htmlDOMElement.classList.add('threedpc_ui')
htmlDOMElement.classList.add('threedpc_ui_theme')

/* eslint-disable no-new */
new Vue({
  el: '#threedpc_ui_app',
  components: { App },
  template: '<App/>'
})
