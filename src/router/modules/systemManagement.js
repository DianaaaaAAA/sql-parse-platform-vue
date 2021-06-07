import Layout from '@/layout'

const systemManagementRouter = {
  path: '/table',
  component: Layout,
  // redirect: '/table/complex-table',
  redirect: 'noRedirect',
  name: 'SystemManagement',
  meta: {
    title: '系统管理',
    icon: 'component'
  },
  children: [
    {
      path: 'user-manage-table',
      component: () => import('@/views/table/user-manage-table'),
      name: 'UserManagement',
      meta: { title: '用户管理' }
    },
    {
      path: 'user-edit-table',
      component: () => import('@/views/table/user-edit-table/index'),
      name: 'RoleManagement',
      meta: { title: '角色管理' }
    }
  ]
}
export default systemManagementRouter
