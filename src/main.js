/* 
* @Author: leeZ
* @Date:   2018-03-28 17:14:26
* @Last Modified by:   leeZ
* @Last Modified time: 2018-03-29 15:21:45
*/

import Vue from 'vue'
import App from './app.vue'

import './assets/styles/reset.css'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)