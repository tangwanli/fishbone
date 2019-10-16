import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/main/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
    	name: 'redirect',
    	path: '*',
    	redirect: '/'
    }
  ]
})
