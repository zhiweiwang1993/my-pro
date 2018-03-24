// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import router from './router'
import App from './App'
import tools from './assets/tools.js'

import navItem from './components/navItem'
// 注册
Vue.component('navItem',navItem )

Vue.use(ElementUI);


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  // 注入到根实例中
  render: h => h(App)
})
