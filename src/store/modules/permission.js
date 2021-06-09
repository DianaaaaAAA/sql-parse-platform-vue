import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 定义一个从后台请求的所有路由信息,对应将下面的accessedRoutes都替换为myAsyncRoutes
      // let res = await getRoutes() //对应的改为generateRoutes： async function,异步改为同步
      // let myAsyncRoutes = res.data
      // 定义一个变量，用于存放可以访问的路由表
      let accessedRoutes
      // 判断当前角色列表中是否有admin
      if (roles.includes('admin')) {
        // 所有路由都可以被访问
        // 连接后端，可以将asyncRoutes改造成从后端数据库获取，而不是import导入
        // 其中，要按照定义的asyncRoutes结构返回
        accessedRoutes = asyncRoutes || []
      } else {
        // 根据角色过滤不能访问的路由表
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // 提交
      commit('SET_ROUTES', accessedRoutes)
      // 成功返回
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
