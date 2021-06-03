import Layout from '@/layout'

const systemManagementRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'SystemManagement',
  meta: {
    title: '系统管理',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'UserManagement',
      meta: { title: '用户管理' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'RoleManagement',
      meta: { title: '角色管理' }
    }
  ]
}
export default systemManagementRouter
