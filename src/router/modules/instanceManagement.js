import Layout from '@/layout'

const instanceManagementRouter = {
  path: '/tisp',
  component: Layout,
  children: [
    {
      path: 'inline-edit-table',
      component: () => import('@/views/tisp/instance-manage'),
      name: 'InstanceSelected',
      meta: { title: '集群管理', icon: 'el-icon-copy-document', noCache: true }
    }
  ]
}

export default instanceManagementRouter
