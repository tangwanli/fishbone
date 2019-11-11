import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/main/home'
import task from '@/components/main/task'
import DetailTask from '@/components/main/DetailTask'
import project from '@/components/main/project'
import DetailProject from '@/components/main/DetailProject'
import projectPreview from '@/components/main/projectPreview'
import projectDoc from '@/components/main/projectDoc'
import projectChart from '@/components/main/projectChart'
import projectCalendar from '@/components/main/projectCalendar'
import projectTaskList from '@/components/main/projectTaskList'
import schedule from '@/components/schedule'
import register from '@/components/register'



Vue.use(Router)
// schedule

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
      path: '/schedule',
      name: 'schedule',
      component: schedule,
      children: [{
        path: '/schedule/:id',
        name: 'DetailTask',
        component: DetailTask
      }]
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/task',
      name: 'task',
      component: task,
      children: [{
        path: '/task/:id',
        name: 'DetailTask',
        component: DetailTask
      }]
    },
    {
      path: '/project',
      name: 'project',
      component: project
    },
    {
      path: '/DetailProject/:proId',
      name: 'DetailProject',
      component: DetailProject,
      children: [{
        path: '/DetailProject/:proId/projectPreview',
        name: 'projectPreview',
        component: projectPreview
      },{
        path: '/DetailProject/:proId/projectDoc',
        name: 'projectDoc',
        component: projectDoc
      },{
        path: '/DetailProject/:proId/projectChart',
        name: 'projectChart',
        component: projectChart
      },{
        path: '/DetailProject/:proId/projectCalendar',
        name: 'projectCalendar',
        component: projectCalendar,
        children: [{
          path: '/DetailProject/:proId/projectCalendar/:id',
          name: 'DetailTask',
          component: DetailTask
        }]
      },{
        path: '/DetailProject/:proId/projectTaskList',
        name: 'projectTaskList',
        component: projectTaskList,
        children: [{
          path: '/DetailProject/:proId/projectTaskList/:id',
          name: 'DetailTask',
          component: DetailTask
        }]
      }]
    },
    {
    	name: 'redirect',
    	path: '*',
    	redirect: '/home'
    }
  ]
})
