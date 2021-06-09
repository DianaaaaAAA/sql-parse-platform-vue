import Layout from '@/layout'

const instanceManagementRouter = {
  path: '/table',
  component: Layout,
  children: [
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InstanceSelected',
      meta: { title: '实例选择', icon:'el-icon-thumb', noCache: true }
    }
  ]
}

export default instanceManagementRouter
