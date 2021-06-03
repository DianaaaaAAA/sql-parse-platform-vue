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
      meta: { title: 'SQL脚本', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'InstanceSelected',
      meta: { title: '实例选择', noCache: true }
    }
  ]
}

export default instanceManagementRouter
