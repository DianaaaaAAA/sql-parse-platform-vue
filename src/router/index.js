import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import ruleManagementRouter from './modules/ruleManagement'
// import sqlTextManagementRouter from './modules/sqlTextManagement'
import sqlAuditRouter from './modules/sqlAudit'
import instanceManagementRouter from './modules/instanceManagement'
// import systemManagementRouter from './modules/systemManagement'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   设置菜单是否隐藏，不显示在左边菜单，缺省FALSE
 * alwaysShow: true               设置在一级菜单上，是否总是显示，true表示总是显示
 *                                如果设为FALSE，一级菜单只会在有多个子菜单的情况下才显示
 *
 * redirect: noRedirect           如果设置成noRedirect，面包屑不会重定向
 * name:'router-name'             路由名称，必须设置且唯一！！
 * meta : {
    roles: ['admin','editor']    允许路由的角色列表
    title: 'title'               显示在左边导航栏和面包屑上的名称
    icon: 'svg-name'/'el-icon-x' 图标名称
    noCache: true                页面是否不要缓存，缺省为false
    affix: true                  标签页面是否总是显示（不能关闭）
    breadcrumb: false            缺省TRUE，是否以面包屑显示页面
    activeMenu: '/example/list'  在左边菜单栏上高亮显示
  }
 */

/**
 * constantRoutes基本路由表
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout, // 定义component的时候都是对象
    // 但是，在数据库中保存的都是字符串；需要将组件名称替换为组件对象，同时，将路由对象中没有值得children删除
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   // redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: '首页',
  //       meta: { title: '首页', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  ruleManagementRouter,
  instanceManagementRouter,
  // sqlTextManagementRouter,
  sqlAuditRouter,
  // systemManagementRouter,
  // {
  //   path: '/guide',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: '页面导航',
  //       meta: { title: '页面导航', icon: 'guide', affix: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // tableRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
