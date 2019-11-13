import Vue from 'vue'
import Home from '@/components/home/Home'

var vm

describe('Home.vue', () => {
  const Constructor = Vue.extend(Home)
  it('should render without crashing', () => {
    vm = new Constructor().$mount()
  })
  it('should render canvas of 200x200px', () => {
    expect(vm.$el.querySelector('#home_canvas').width)
      .toBe(200)
    expect(vm.$el.querySelector('#home_canvas').height)
      .toBe(200)
  })
})
