import Layout from '@/layout'

const instanceManagementRouter = {
  path: '/tisp',
  component: Layout,
  children: [
    {
      path: 'inline-edit-table',
      component: () => import('@/views/tisp/instance-manage'),
      name: 'InstanceSelected',
      meta: { title: '实例选择', icon: 'el-icon-thumb', noCache: true }
    }
  ]
}

export default instanceManagementRouter
