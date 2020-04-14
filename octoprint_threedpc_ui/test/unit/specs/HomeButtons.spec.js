import Vue from 'vue'
import HomeButtons from '@/components/home/HomeButtons'

var vm

describe('HomeButtons.vue', () => {
  // ------------------
  // Contruct and mount
  //
  const Constructor = Vue.extend(HomeButtons)
  it('should render without crashing', () => {
    vm = new Constructor().$mount()
  })
  // ------------------
  // All other features tests
  //
  it('prop "buttons" should return an empty array by default', () => {
    expect(vm.$props.buttons)
      .toEqual([])
  })
})
