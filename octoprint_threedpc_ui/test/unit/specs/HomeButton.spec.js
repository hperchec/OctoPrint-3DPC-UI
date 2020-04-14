import { mount } from '@vue/test-utils'
import HomeButton from '@/components/home/HomeButton'

describe('HomeButton.vue', () => {
  // ------------------
  // Contruct and mount
  //
  it('should render without crashing', () => {
    const wrapper = mount(HomeButton)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // // ------------------
  // // All other unit tests
  // //
  // it('method "defaultClick" should return true', () => {
  //   const wrapper = mount(HomeButton)
  //   expect(wrapper.vm.$props.click.default()).toBeTruthy()
  // })
  // it('prop "click" should return "defaultClick" method value', () => {
  //   const wrapper = mount(HomeButton)
  //   expect(wrapper.vm.$props.click()).toEqual(wrapper.vm.defaultClick())
  // })
})
