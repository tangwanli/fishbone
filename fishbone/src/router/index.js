import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/main/home'
import task from '@/components/main/task'
import DetailTask from '@/components/main/DetailTask'
import project from '@/components/main/project'
import DetailProject from '@/components/main/DetailProject'



Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/home/:id',
        name: 'DetailTask',
        component: DetailTask
      }]
    },
    {
      path: '/task',
      name: 'task',
      component: task
    },
    {
      path: '/project',
      name: 'project',
      component: project
    },
    {
      path: '/DetailProject',
      name: 'DetailProject',
      component: DetailProject
    },
    {
    	name: 'redirect',
    	path: '*',
    	redirect: '/home'
    }
  ]
})
