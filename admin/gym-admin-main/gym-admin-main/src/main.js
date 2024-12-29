import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import AmapVue from '@amap/amap-vue'

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

AmapVue.config.key = '2594f8d6a43239c17773aa092a47ec6f'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.config.productionTip = false
Vue.use(AmapVue)

// The 'el' attribution means add all the elements which has id = app.
/** This specifies the root component that the Vue instance should render.
 In this case, App is the root component of the application,
 and h => h(App) is a shorthand way of writing a render function that creates and returns an instance of the App component.*/
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
