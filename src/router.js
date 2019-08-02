import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import(/* webpackChunkName: "home" */ './views/Home')
    // },
    {
      path: '/mx',
      name: 'mx',
      component: () => import(/* webpackChunkName: "mx" */ './views/Mx')
    },
    {
      path: '/',
      name: 'workflow',
      component: () => import(/* webpackChunkName: "workflow" */ './views/Workflow')
    },

    
  ]
})
