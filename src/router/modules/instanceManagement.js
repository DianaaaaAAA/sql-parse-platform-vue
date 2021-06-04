import Layout from '@/layout'

const instanceManagementRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'InstanceManagement',
  meta: {
    title: '实例管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'SQLScript',
      meta: { title: 'SQL文本上传', noCache: true }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InstanceSelected',
      meta: { title: '实例选择', noCache: true }
    }
  ]
}

export default instanceManagementRouter
