import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/module/Login'
import Home from '@/module/Home'
import Content from '@/module/Content'
import WorkPlan from '@/module/WorkPlan'
import WorkStatistics from '@/module/WorkStatistics'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/',name: 'Login',component: Login},
    {path: '/Home',name: 'Home',component: Home,
      children:[
        {path: 'Content',name: 'Content',component: Content},
        {path: 'WorkPlan',name: 'WorkPlan',component: WorkPlan},
        {path: 'WorkStatistics',name: 'WorkStatistics',component: WorkStatistics},
      ]
    },
  ]
})
